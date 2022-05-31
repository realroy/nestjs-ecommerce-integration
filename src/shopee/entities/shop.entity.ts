import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ImageEntity } from './image.entity';
import { TokenEntity } from './token.entity';

@Entity({ name: 'shopee_shop' })
export class ShopEntity extends BaseEntity {
  @Column({ nullable: false })
  code: string;

  @Column({ name: 'partner_id', nullable: false })
  partnerId: string;

  @OneToMany(() => ImageEntity, (image) => image.shop)
  images: ImageEntity[];

  @OneToMany(() => TokenEntity, (token) => token.shop)
  tokens: TokenEntity[];

  @Column({ name: 'orders_sync_at' })
  ordersSyncAt: Date;
}
