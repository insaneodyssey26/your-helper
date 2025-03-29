class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong" , errors = [] , stack = "") { // to handle the error
    super(message); // to override the message
    this.statusCode = statusCode; // to set the status code
    this.data = null // to set the data
    this.message = message; // to set the message
    this.success = false; // to set the success
    this.errors = errors; // to set the errors

    if(stack){ // to set the stack
        this.stack = stack;
    }else{
        Error.captureStackTrace(this, this.constructor); // to capture the stack 
    }
  }
}

export {ApiError }