import { HttpException, HttpStatus } from '@nestjs/common';

export default class ExpiredAccessTokenException extends HttpException {
  constructor() {
    super('ExpiredAccessTokenException', HttpStatus.UNAUTHORIZED);
  }
}
