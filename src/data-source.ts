import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'nestjs_ecom_integration_development',
  entities: ['./src/shopee/entities/*.entity.ts'],
  synchronize: true,
  logging: true,
  migrations: ['./src/migrations/*.ts'],
});

export default dataSource;
