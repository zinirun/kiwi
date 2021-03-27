const nodemailer = require('nodemailer');
const { mailerConf } = require('../config/mailerconfig');

// mail: to, subject, text, html
const sendMail = (mail) =>
    new Promise(async () => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: mailerConf.user,
                    pass: mailerConf.pass,
                },
            });
            const send = await transporter.sendMail({
                from: mailerConf.from,
                ...mail,
            });
            console.log(`Mail sent: ${send.messageId}`);
            return send.messageId;
        } catch (error) {
            console.error(`Mail Error: ${error}`);
        }
    });

// user: email, userName, userAccount, newPassword
const sendMailOfResetPassword = async (user, newPassword) => {
    const mail = {
        to: user.email,
        subject: `[키위] ${user.userName}님의 비밀번호가 초기화되었습니다.`,
        text: `${user.userName}님의 새로운 비밀번호를 확인하세요.`,
        html: `<div style="color: black"><ul style="font-size: 16px; background: #eee; border-radius: 10px; padding: 15px; list-style: none">
        <li>아이디: ${user.userAccount}</li>
        <li>임시 비밀번호: ${newPassword}</li>
        <li>* 로그인 후 반드시 비밀번호를 변경하세요.</li>
    </ul>
    <p style="margin-top: 35px; text-align: center; font-size: 18px">키위 운영팀</p>
    <p style="margin-top: 15px; text-align: center; font-size: 12px; color: '#999'">
        본 메일은 발신 전용입니다.
    </p></div>`,
    };
    return await sendMail(mail);
};

module.exports = {
    sendMailOfResetPassword,
};
