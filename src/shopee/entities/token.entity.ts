import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ShopEntity } from './shop.entity';

@Entity({ name: 'shopee_token' })
export class TokenEntity extends BaseEntity {
  @Column({ unique: true })
  accessToken: string;

  @Column()
  expiredAt: Date;

  @Column({ unique: true })
  refreshToken: string;

  @Column()
  partnerId: string;

  @ManyToOne(() => ShopEntity, (shop) => shop.id)
  shop: Promise<ShopEntity>;

  @Column({ nullable: true, unique: true })
  shopId: string;

  get isExpired() {
    return this.expiredAt <= new Date();
  }
}
