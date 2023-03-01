import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SchoolsController } from './schools.controller';
import { School } from './schools.entity';
import { SchoolsRepository } from './schools.repository';
import { SchoolsService } from './schools.service';

@Module({
  imports: [TypeOrmModule.forFeature([School]), AuthModule],
  controllers: [SchoolsController],
  providers: [SchoolsService, SchoolsRepository],
})
export class SchoolsModule {}
