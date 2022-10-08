import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ImageEntity } from './image.entity';
import { OrderSynchronizationEntity } from './order-synchronization.entity';
import { TokenEntity } from './token.entity';

@Entity({ name: 'shopee_shop' })
export class ShopEntity extends BaseEntity {
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
