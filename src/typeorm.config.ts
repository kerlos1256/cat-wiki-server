import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Breed } from './entities/breed.entity';

export const TypeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'cat-wiki',
  entities: [Breed],
  synchronize: true,
};
