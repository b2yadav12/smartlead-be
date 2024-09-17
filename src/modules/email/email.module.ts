import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailResolver } from './email.resolver';
import { EmailService } from './email.service';
import { EmailConfiguration } from '../../data-models/entities/email-configuration.entity';
import { DataModelsModule } from '../../data-models/data-models.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmailConfiguration]), DataModelsModule],
  providers: [EmailResolver, EmailService],
})
export class EmailModule {}
