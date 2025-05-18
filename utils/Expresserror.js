class ExpressError extends Error {
  constructor(statusCode=500,message) {
    super(message);
    this.statusCode = statusCode;
    this.message= message;
  }
}

module.exports=ExpressError;