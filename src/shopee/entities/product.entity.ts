import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ImageEntity } from './image.entity';
import { ShopEntity } from './shop.entity';

@Entity({ name: 'shopee_product' })
export class ProductEntity extends BaseEntity {
  @Column({ type: 'jsonb' })
  data: Record<string, any>;

  @Column({ unique: true, nullable: false })
  sku: string;

  @ManyToOne(() => ShopEntity, (shop) => shop.id)
  @JoinColumn({ name: 'shop_id', referencedColumnName: 'id' })
  shop: ShopEntity;

  @Column({ name: 'shop_id', nullable: false })
  shopId: string;

  @OneToMany(() => ImageEntity, (image) => image.id, { nullable: true })
  images: ImageEntity[];
}
