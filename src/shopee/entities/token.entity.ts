import { Column, Entity, JoinColumn, ManyToOne, Raw } from 'typeorm';
import ENTITY_NAMES from '../constants/entities';

import { BaseEntity } from './base.entity';
import { ShopEntity } from './shop.entity';
@Entity({ name: ENTITY_NAMES.TOKENS })
export class TokenEntity extends BaseEntity {
  static NAME = ENTITY_NAMES.TOKENS;

  @Column({ name: 'access_token', unique: true })
  accessToken: string;

  @Column({ name: 'expired_at' })
  expiredAt: Date;

  @Column({ name: 'refresh_token', unique: true })
  refreshToken: string;

  @Column({ name: 'partner_id' })
  partnerId: string;

  @ManyToOne(() => ShopEntity, (shop) => shop.id)
  @JoinColumn({ name: 'shop_id', referencedColumnName: 'id' })
  shop: ShopEntity;

  @Column({ name: 'shop_id', nullable: true, unique: true })
  shopId: string;

  get isExpired() {
    const now = new Date();
    console.log({ now, expiredAt: this.expiredAt });
    return now >= this.expiredAt;
  }

  static getActives(options?: { take: number; skip: number }) {
    return this.find({
      where: { expiredAt: Raw((alias) => `${alias} > NOW()`) },
      ...(options.take && { take: options.take }),
      ...(options.skip && { skip: options.skip }),
    });
  }
}
