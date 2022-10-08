import { Column, Entity, OneToMany } from 'typeorm';
import ENTITY_NAMES from '../constants/entities';

import { BaseEntity } from './base.entity';
import { ImageEntity } from './image.entity';
import { OrderSynchronizationEntity } from './order-synchronization.entity';
import { TokenEntity } from './token.entity';

@Entity({ name: ENTITY_NAMES.SHOPS })
export class ShopEntity extends BaseEntity {
  static NAME = ENTITY_NAMES.SHOPS;

  @Column({ nullable: true })
  code: string | null;

  @Column({ name: 'partner_id' })
  partnerId: string;

  @OneToMany(() => ImageEntity, (image) => image.shop)
  images: ImageEntity[];

  @OneToMany(() => TokenEntity, (token) => token.shop)
  tokens: TokenEntity[];

  @OneToMany(() => OrderSynchronizationEntity, ({ shop }) => shop)
  orderSynchronizations: OrderSynchronizationEntity[];

  // Keep sign data for request code since we need to ensure callback really sent from Shopee.
  @Column({})
  signData: string;
}
