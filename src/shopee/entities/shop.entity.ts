import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ImageEntity } from './image.entity';

@Entity({ name: 'shopee_shop' })
export class ShopEntity extends BaseEntity {
  @Column()
  code: string;

  @Column()
  partnerId: string;

  @Column({ unique: true })
  shopId: string;

  @OneToMany(() => ImageEntity, (image) => image.shop)
  images: ImageEntity[];
}
