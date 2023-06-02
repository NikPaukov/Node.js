export class StatusCodeError extends Error {
    statusCode

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, StatusCodeError.prototype);
    }
}
