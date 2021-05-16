// Creates custom errors that can be thrown, but also have details that can help later.
// NOTE: the [type] property codes are being documented in the README.md at the root of the server directory.
function CustomError (description, responseCode, type) {
    this.description = description
    this.responseCode = responseCode
    this.errorCode = type
}
CustomError = CustomError.bind(new Error())

// DRYs up the catch blocks
function errorHandler (res, error) {
    if (error instanceof CustomError) {
        res.status(error.responseCode).send(error)
    } else if (error instanceof Error){
        res.status(500).send(error.message)
    } else {
        res.status(500).send(error)
    }
}

module.exports = {CustomError, errorHandler}