import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base';

@Entity({ name: 'shopee_shop' })
export class ShopEntity extends BaseEntity {
  @Column()
  code: string;

  @Column()
  shopId: string;
}
