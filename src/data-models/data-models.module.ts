import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailConfiguration } from './entities/email-configuration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailConfiguration])],
  exports: [TypeOrmModule],
})
export class DataModelsModule {}
