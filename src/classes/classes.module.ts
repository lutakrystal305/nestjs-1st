import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesController } from './classes.controller';
import { Classes } from './classes.entity';
import { ClassesRepository } from './classes.repository';
import { ClassesService } from './classes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Classes])],
  controllers: [ClassesController],
  providers: [ClassesService, ClassesRepository],
})
export class ClassesModule {}
