import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ShopIdMiddleware implements NestMiddleware {
  use(req: Request & { shopId: string }, res: Response, next: NextFunction) {
    // if (req.headers.authorization) {
    //
    // }
    console.log('set shop Id')
    req.shopId = '48817';
    next();
  }
}
