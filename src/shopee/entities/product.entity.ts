import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ImageEntity } from './image.entity';
import { ShopEntity } from './shop.entity';

@Entity({ name: 'shopee_product' })
export class ProductEntity extends BaseEntity {
  @Column({ type: 'jsonb' })
  data: any;

  @Column({ unique: true, nullable: false })
  sku: string;

  @ManyToOne(() => ShopEntity, (shop) => shop.id)
  shop: Promise<ShopEntity>;

  @Column({ nullable: false })
  shopId: string;

  @OneToMany(() => ImageEntity, (image) => image.id, { nullable: true })
  images: Promise<ImageEntity[]>;
}
