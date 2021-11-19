import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Breed } from './entities/breed.entity';
import { TypeOrmConfig } from './typeorm.config';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Breed]),
    TypeOrmModule.forRoot(TypeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
