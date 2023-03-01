import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { School } from 'src/schools/schools.entity';

export class UpdateClassDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
