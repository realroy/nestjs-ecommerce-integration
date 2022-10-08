import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import ENTITY_NAMES from '../constants/entities';
import { OrderSynchronizationStatus } from '../enums';

import { BaseEntity } from './base.entity';
import { ShopEntity } from './shop.entity';

@Entity({ name: ENTITY_NAMES.ORDER_SYNCHRONIZATIONS })
export class OrderSynchronizationEntity extends BaseEntity {
  static NAME = ENTITY_NAMES.ORDER_SYNCHRONIZATIONS;

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
