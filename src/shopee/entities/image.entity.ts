import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'shopee_image' })
export class ImageEntity extends BaseEntity {
  @Column({ unique: true })
  imageId: string;

  @Column({ type: 'jsonb' })
  imageUrlList: any;
}
