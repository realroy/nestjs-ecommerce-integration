import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import ENTITY_NAMES from '../constants/entities';

import { BaseEntity } from './base.entity';
import { ImageEntity } from './image.entity';
import { ShopEntity } from './shop.entity';

@Entity({ name: ENTITY_NAMES.PRODUCTS })
export class ProductEntity extends BaseEntity {
  static NAME = ENTITY_NAMES.PRODUCTS;

  @Column({ type: 'jsonb' })
  data: Record<string, any>;

  @Column({ unique: true })
  sku: string;

  @ManyToOne(() => ShopEntity, (shop) => shop.id)
  @JoinColumn({ name: 'shop_id', referencedColumnName: 'id' })
  shop: ShopEntity;

  @Column({ name: 'shop_id' })
  shopId: string;

  @OneToMany(() => ImageEntity, (image) => image.id)
  images: ImageEntity[];
}
