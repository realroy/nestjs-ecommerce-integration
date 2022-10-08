import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import ENTITY_NAMES from '../constants/entities';

import { BaseEntity } from './base.entity';
import { ProductEntity } from './product.entity';
import { ShopEntity } from './shop.entity';

@Entity({ name: ENTITY_NAMES.IMAGES })
export class ImageEntity extends BaseEntity {
  static NAME = ENTITY_NAMES.IMAGES;

  @Column({ type: 'jsonb' })
  data: any;

  @ManyToOne(() => ShopEntity, (shop) => shop.id)
  @JoinColumn({ name: 'shop_id', referencedColumnName: 'id' })
  shop: ShopEntity;

  @Column({ name: 'shop_id', nullable: true })
  shopId: string | null;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: ProductEntity;

  @Column({ name: 'product_id', nullable: true })
  productId: string | null;
}
