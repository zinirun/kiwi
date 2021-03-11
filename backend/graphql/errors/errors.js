const AuthorizationError = (error) => {
    return new Error({
        message: 'Unauthorized access',
        status: 403,
        error,
    });
};

const BadRequestError = (error) => {
    return new Error({
        message: 'Bad Request',
        status: 400,
        error,
    });
};

const NotFoundError = (error) => {
    return new Error({
        message: 'Not Found',
        status: 404,
        error,
    });
};

module.exports = {
    AuthorizationError,
    BadRequestError,
};
