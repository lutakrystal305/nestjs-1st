import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficersController } from './officers.controller';
import { Officer } from './officers.entity';
import { OfficersRepository } from './officers.repository';
import { OfficersService } from './officers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Officer])],
  controllers: [OfficersController],
  providers: [OfficersService, OfficersRepository],
})
export class OfficersModule {}
