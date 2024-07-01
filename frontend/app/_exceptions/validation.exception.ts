/**
 * ValidationException class
 * @author Kenneth Sumang
 */
export default class ValidationException extends Error {
    code: number;
  
    constructor( message: string) {
      super(message);
      this.code = 400;
      Object.setPrototypeOf(this, ValidationException.prototype);
    }
  }