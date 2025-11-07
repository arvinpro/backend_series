

class ApiError extends Error {
    constructor(
        message = "something went wrong",
        statusCode,
        error = [],
        statck = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.error = this.error;
        this.statck = statck;
        this.data = null;
        this.success = false;

        if(statck){
            this.statck = statck;

        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}