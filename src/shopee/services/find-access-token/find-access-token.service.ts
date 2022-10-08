import { Injectable } from '@nestjs/common';

import { TokenEntity } from 'src/shopee/entities';
import { ExpiredAccessTokenException } from 'src/shopee/exceptions';

@Injectable()
export default class FindAccessTokenService {
  async call(shopId: string) {
    const token = await TokenEntity.findOneByOrFail({ shopId });
    if (token.isExpired) {
      throw new ExpiredAccessTokenException();
    }

    return token.accessToken;
  }
}
