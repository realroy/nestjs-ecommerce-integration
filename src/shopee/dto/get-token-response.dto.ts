import { Expose } from 'class-transformer';

export class GetTokenResponseDto {
  @Expose({ name: 'request_id' })
  requestId: string;

  error: string;

  @Expose({ name: 'refresh_token' })
  refreshToken: string;

  @Expose({ name: 'access_token' })
  accessToken: string;

  @Expose({ name: 'expire_in' })
  expireIn: number;

  message: string;

  @Expose({ name: 'merchant_id_list' })
  merchantIdList: string[];

  @Expose({ name: 'shop_id_list' })
  shopIdList: string[];
}
