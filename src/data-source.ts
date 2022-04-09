import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'nestjs_ecom_integration_development',
  entities: ['src/entities/*.entity.ts'],
  synchronize: true,
  // logNotifications: true,
  // migrations: ['src/migrations/*.{js,ts}'],
});

export default dataSource;
