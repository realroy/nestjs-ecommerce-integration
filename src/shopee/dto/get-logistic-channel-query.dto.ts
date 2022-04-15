import { IsNumberString } from 'class-validator';

export class GetLogisticChannelsQueryDto {
  @IsNumberString()
  shopId: string;
}
