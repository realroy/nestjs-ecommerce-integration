import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ImageEntity } from './image.entity';
import { TokenEntity } from './token.entity';

@Entity({ name: 'shopee_shop' })
export class ShopEntity extends BaseEntity {
  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  partnerId: string;

  @OneToMany(() => ImageEntity, (image) => image.shop)
  images: Promise<ImageEntity[]>;

  @OneToMany(() => TokenEntity, (token) => token.shop)
  tokens: Promise<TokenEntity[]>;
}
