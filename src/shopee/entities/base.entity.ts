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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
