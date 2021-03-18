const emptyValidator = (user) => {
    let required;
    for (const key in user) {
        const value = user[key];
        if (!value) {
            switch (key) {
                case 'userAccount':
                    required = '아이디';
                    break;
                case 'password':
                    required = '비밀번호';
                    break;
                case 'userName':
                    required = '이름';
                    break;
                case 'departmentId':
                    required = '학과';
                    break;
                case 'studentNumber':
                    required = '학번';
                    break;
                case 'studentGradeId':
                    required = '학년';
                    break;
                default:
                    break;
            }
            break;
        }
    }
    return required ? `${required}을(를) 입력 또는 선택하세요` : null;
};

export const passwordValidator = (password, passwordAgain) => {
    if (password.length < 8) {
        return '비밀번호는 8자 이상으로 입력하세요.';
    }
    if (password !== passwordAgain) {
        return '비밀번호, 비밀번호 확인이 서로 일치하지 않습니다';
    }
};

export const SignupValidator = (user) =>
    new Promise((resolve, reject) => {
        const emptyMessage = emptyValidator(user);
        if (emptyMessage) {
            reject(new Error(emptyMessage));
        }
        const pwdMessage = passwordValidator(user.password, user.passwordAgain);
        if (pwdMessage) {
            reject(new Error(pwdMessage));
        }
        resolve({
            userAccount: user.userAccount,
            password: user.password,
            userName: user.userName,
            departmentId: user.departmentId,
            studentNumber: user.studentNumber,
            studentGradeId: user.studentGradeId,
            companyId: user.companyId,
        });
    });
