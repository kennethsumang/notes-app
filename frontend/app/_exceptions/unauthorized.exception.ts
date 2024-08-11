/**
 * UnauthorizedException class
 * @author Kenneth Sumang
 */
export default class UnauthorizedException extends Error {
  code: number;

  constructor() {
    super('Unauthorized.');
    this.code = 401;
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}
