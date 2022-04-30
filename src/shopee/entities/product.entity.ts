import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ImageEntity } from './image.entity';
import { ShopEntity } from './shop.entity';

@Entity({ name: 'shopee_product' })
export class ProductEntity extends BaseEntity {
  @Column({ type: 'jsonb' })
  data: any;

  @ManyToOne(() => ShopEntity, (shop) => shop.shopId)
  shop: ShopEntity;

  @OneToMany(() => ImageEntity, (image) => image.id)
  images: ImageEntity[];
}
