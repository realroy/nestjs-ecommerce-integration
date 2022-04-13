import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'shopee_shop' })
export class ShopEntity extends BaseEntity {
  @Column()
  code: string;

  @Column()
  shopId: string;
}
