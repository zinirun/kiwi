const models = require('../../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { ConflictError } = require('../../graphql/errors/errors');
const { Op } = require('sequelize');
const { sendMailOfResetPassword, sendMailOfEmailAuth } = require('../../api/mailer');

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

const makeBlurUserAccount = (fullId) => {
    return fullId.slice(0, fullId.length - fullId.length / 2).concat('***');
};

module.exports = {
    createHashedPassword,
    makePasswordHashed,
    post_signup: async (req, res) => {
        const { userAccount: userAccountInput, studentNumber: studentNumberInput } = req.body.user;
        const isExists = await models.user.findOne({
            attributes: ['id', 'userAccount', 'studentNumber'],
            raw: true,
            where: {
                [Op.or]: [
                    {
                        userAccount: userAccountInput,
                    },
                    {
                        studentNumber: studentNumberInput,
                    },
                ],
            },
        });

        if (isExists) {
            const { userAccount } = isExists;
            userAccount === userAccountInput
                ? res.json({
                      success: false,
                      duplicate: 'USER_ACCOUNT',
                  })
                : res.json({
                      success: false,
                      duplicate: 'STUDENT_NUMBER',
                  });
            return;
        }

        const { password, salt } = await createHashedPassword(req.body.user.password);
        const { studentNumber, userName, email } = req.body.user;

        return sendMailOfEmailAuth(userName, email, studentNumber, password.slice(0, 6))
            .then(async () => {
                await models.user
                    .create({
                        ...req.body.user,
                        password,
                        salt,
                    })
                    .then(async (result) => {
                        return res.json({
                            success: true,
                            userAccount: result.dataValues.userAccount,
                        });
                    })
                    .catch((error) => res.status(409).json({ error }));
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
                    'status',
                    'type',
                    'email',
                    'createdAt',
                    'updatedAt',
                ],
                where: { userAccount, password },
                raw: true,
            })
            .then((user) => {
                if (user) {
                    const { status } = user;
                    switch (
                        status // 1: 인증됨
                    ) {
                        case 0: // 미인증 (메일)
                            return res.json({
                                success: false,
                                message: 'NO_EMAIL_CHECK',
                                email: user.email,
                                user,
                            });
                        case 2: // 정지
                            return res.json({
                                success: false,
                                message: 'BLOCKED',
                                user,
                            });
                        case 3: // 탈퇴
                            return res.json({
                                success: false,
                                message: 'SECESSION',
                                user,
                            });
                    }
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
                            if (token) {
                                res.cookie('x-access-token', token, { httpOnly: true });
                                res.json({
                                    success: true,
                                    message: 'SIGNED',
                                    user,
                                });
                            }
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
            return res.status(200).json({
                departments,
                studentGrades,
            });
        } catch (err) {
            return res.status(409).json(ConflictError('Error occured at get signup metadata'));
        }
    },

    post_find_user_account: async (req, res) => {
        const { userName, studentNumber } = req.body.user;
        const user = await models.user.findOne({
            attributes: ['id', 'userAccount'],
            where: { userName, studentNumber },
            raw: true,
        });
        if (!user) {
            return res.status(409).json({ error: { name: 'invalid' } });
        }
        return res.json({
            userName,
            studentNumber,
            userAccount: makeBlurUserAccount(user.userAccount),
        });
    },

    post_reset_password: async (req, res) => {
        const { userName, userAccount, studentNumber } = req.body.user;

        const isValidUser = await models.user.findOne({
            attributes: ['id', 'userName', 'userAccount', 'email'],
            where: { userAccount, userName, studentNumber },
            raw: true,
        });
        if (!isValidUser) {
            return res.status(409).json({ error: { name: 'invalid' } });
        }

        const newPassword = createSixRandomPassword().toString();
        const { password, salt } = await createHashedPassword(newPassword);
        return await models.user
            .update({ password, salt }, { where: { id: isValidUser.id } })
            .then(() => {
                const mail = sendMailOfResetPassword(isValidUser, newPassword);
                return res.json({
                    success: true,
                    userAccount,
                    userName: isValidUser.userName,
                    email: isValidUser.email,
                });
            })
            .catch((error) => {
                return res.status(409).json({ error });
            });
    },

    post_email_auth: async (req, res) => {
        const { sn: studentNumber, code } = req.body;

        const user = await models.user.findOne({
            attributes: ['id', 'password', 'status'],
            where: { studentNumber },
            raw: true,
        });

        if (user.status !== 0) {
            return user.status === 1
                ? res.json({
                      success: false,
                      message: 'ALREADY_DONE',
                      user,
                  })
                : res.json({
                      success: false,
                      message: 'BAD_USER',
                      user,
                  });
        }

        if (!user) {
            return res.json({
                success: false,
                message: 'NO_USER',
                user,
            });
        }

        if (user.password.slice(0, 6) !== code) {
            return res.json({
                success: false,
                message: 'INVALID_CODE',
                user,
            });
        }

        return await models.user
            .update({ status: 1 }, { where: { id: user.id } })
            .then(() =>
                res.json({
                    success: true,
                }),
            )
            .catch((error) => {
                return res.status(409).json({ error });
            });
    },
};
