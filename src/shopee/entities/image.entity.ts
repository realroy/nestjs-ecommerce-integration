import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ProductEntity } from './product.entity';
import { ShopEntity } from './shop.entity';

@Entity({ name: 'shopee_image' })
export class ImageEntity extends BaseEntity {
  @Column({ type: 'jsonb' })
  data: any;

  @ManyToOne(() => ShopEntity, (shop) => shop.shopId)
  shop: ShopEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  product: ProductEntity;
}
