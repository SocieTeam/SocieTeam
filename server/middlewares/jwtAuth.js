const jwt = require('jsonwebtoken');
const { CustomError, errorHandler } = require('./errors')

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_KEY)
        req.userId = decoded.userId
        next()
    } catch (err) {
        switch (err.message) {
            case 'jwt expired':
                const error = new CustomError(err.message, 403, 5)
                errorHandler(res, error)
                break;
            default:
                errorHandler(res, err)
        }
    }
}