import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'shopee_token' })
export class TokenEntity extends BaseEntity {
  @Column({ unique: true })
  accessToken: string;

  @Column()
  expiredAt: Date;

  @Column({ unique: true })
  refreshToken: string;

  @Column()
  partnerId: string;

  get isExpired() {
    return this.expiredAt <= new Date();
  }
}
