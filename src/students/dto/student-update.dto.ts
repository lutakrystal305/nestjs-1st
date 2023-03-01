import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Classes } from 'src/classes/classes.entity';

export class UpdateStudentDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  cls: Classes;
}
