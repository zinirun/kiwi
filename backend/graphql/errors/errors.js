const AuthorizationError = (error) => {
    return new Error({
        message: 'Unauthorized access',
        statusCode: 403,
        error,
    });
};

const BadRequestError = (error) => {
    return new Error({
        message: 'Bad Request',
        statusCode: 400,
        error,
    });
};

const NotFoundError = (error) => {
    return new Error({
        message: 'Not Found',
        statusCode: 404,
        error,
    });
};

const ConflictError = (error) => {
    return new Error({
        message: 'Conflict occured',
        statusCode: 409,
        error,
    });
};
module.exports = {
    AuthorizationError,
    BadRequestError,
    NotFoundError,
    ConflictError,
};
