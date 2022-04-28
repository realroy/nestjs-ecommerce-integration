import { ArrayNotEmpty } from 'class-validator';

export class Image {
  @ArrayNotEmpty()
  imageIdList: string[];
}
