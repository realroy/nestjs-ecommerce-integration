import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OrderSynchronizationStatus } from '../enums';

import { BaseEntity } from './base.entity';
import { ShopEntity } from './shop.entity';

@Entity({ name: 'shopee_order_synchronization' })
export class OrderSynchronizationEntity extends BaseEntity {
  @ManyToOne(() => ShopEntity, (shop) => shop.id)
  @JoinColumn({ name: 'shop_id', referencedColumnName: 'id' })
  shop: ShopEntity;

  @Column({ name: 'shop_id' })
  shopId: string;

  @Column({
    type: 'enum',
    enum: OrderSynchronizationStatus,
    default: OrderSynchronizationStatus.Pending,
  })
  status: OrderSynchronizationStatus;
}
