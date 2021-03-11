const AuthorizationError = () => {
    return new Error({
        message: 'Unauthorized access',
        status: 403,
    });
};

module.exports = {
    AuthorizationError,
};
