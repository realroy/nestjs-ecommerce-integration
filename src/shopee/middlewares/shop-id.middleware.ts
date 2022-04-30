import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthorizedRequest } from '../dto';

@Injectable()
export class ShopIdMiddleware implements NestMiddleware {
  use(req: AuthorizedRequest, res: Response, next: NextFunction) {
    // if (req.headers.authorization) {
    //
    // }
    req.shopId = '48817';

    next();
  }
}
