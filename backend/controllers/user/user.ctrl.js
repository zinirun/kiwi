const models = require('../../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { ConflictError } = require('../../graphql/errors/errors');
//const { sendMailOfResetPassword } = require('../../api/mailer');

const createSalt = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
        });
    });

const createHashedPassword = (plainPassword) =>
    new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ password: key.toString('base64'), salt });
        });
    });

const makePasswordHashed = (userAccount, plainPassword) =>
    new Promise(async (resolve, reject) => {
        const salt = await models.user
            .findOne({
                attributes: ['salt'],
                raw: true,
                where: {
                    userAccount,
                },
            })
            .then((result) => (result ? result.salt : reject(new Error('invalid'))))
            .catch((error) => reject(error));
        if (salt) {
            crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
                if (err) reject(err);
                resolve(key.toString('base64'));
            });
        }
    });

const createSixRandomPassword = () => {
    let result = Math.floor(Math.random() * 1000000) + 100000;
    return result > 1000000 ? result - 100000 : result;
};

module.exports = {
    createHashedPassword,
    makePasswordHashed,
    post_signup: async (req, res) => {
        const { password, salt } = await createHashedPassword(req.body.user.password);
        return await models.user
            .create({
                ...req.body.user,
                companyId: req.body.user.companyId || null,
                password,
                salt,
            })
            .then((result) => res.json({ userAccount: result.dataValues.userAccount }))
            .catch((error) => res.status(409).json({ error }));
    },

    post_reset_password: async (req, res) => {
        const { name, userAccount } = req.body.user;

        const isValidUser = await models.user
            .findOne({
                attributes: ['id', 'userAccount'],
                where: { userAccount, name },
                raw: true,
            })
            .then((user) => (user ? true : false))
            .catch(() => false);
        if (!isValidUser) {
            return res.status(409).json({ error: { name: 'invalid' } });
        }

        const newPassword = createSixRandomPassword().toString();
        const { password, salt } = await createHashedPassword(newPassword);
        return await models.user
            .update({ password, salt }, { where: { userAccount, name } })
            .then((result) => {
                if (result[0] === 0) {
                    return res.status(409).json({ error: { name: 'invalid' } });
                } else {
                    //sendMailOfResetPassword(name, userAccount, newPassword);
                    return res.json({ userAccount });
                }
            })
            .catch((error) => res.status(409).json({ error }));
    },

    post_signin: async (req, res) => {
        const { userAccount, password: plainPassword } = req.body.user;
        const password = await makePasswordHashed(userAccount, plainPassword).catch(() => false);
        if (!password) {
            return res.status(409).json({ error: { name: 'invalid' } });
        }
        const secret = req.app.get('jwt-secret');

        return models.user
            .findOne({
                attributes: [
                    'id',
                    'userAccount',
                    'userName',
                    'departmentId',
                    'studentNumber',
                    'studentGradeId',
                    'companyId',
                    'status',
                ],
                where: { userAccount, password },
                raw: true,
            })
            .then((user) => {
                if (user) {
                    // Success signin, generate jwt
                    jwt.sign(
                        {
                            ...user,
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            issuer: 'kiwi.nemobros.com',
                            subject: 'user',
                        },
                        (error, token) => {
                            if (error) res.status(409).json({ error });
                            // send final user info
                            res.cookie('x-access-token', token, { httpOnly: true });
                            res.json({
                                message: 'Sign-in Successfully',
                                token,
                                user,
                            });
                        },
                    );
                } else {
                    res.status(409).json({ error: { name: 'invalid' } });
                }
            })
            .catch((error) => res.status(409).json({ error }));
    },

    post_logout: (_, res) => {
        res.clearCookie('x-access-token');
        res.json({
            message: 'Logout Successfully',
        });
    },

    get_signup_metadata: async (_, res) => {
        try {
            const departments = await models.department.findAll({
                attributes: ['id', 'deptName'],
                raw: true,
            });
            const studentGrades = await models.grade.findAll({
                attributes: ['id', 'gradeName'],
                raw: true,
            });
            const companies = await models.company.findAll({
                attributes: ['id', 'companyName'],
                raw: true,
            });
            return res.status(200).json({
                departments,
                studentGrades,
                companies,
            });
        } catch (err) {
            return res.status(409).json(ConflictError('Error occured at get signup metadata'));
        }
    },
};
