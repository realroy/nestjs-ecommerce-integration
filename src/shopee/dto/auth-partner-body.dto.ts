import { IsNumberString } from 'class-validator';

export class AuthPartnerBody {
  @IsNumberString()
  shopId: string;
}
