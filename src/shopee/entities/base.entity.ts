import {
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  BaseEntity as TypeOrmBaseEntity,
  Column,
} from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @Column({ unique: true, primary: true })
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
