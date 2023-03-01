import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Classes } from 'src/classes/classes.entity';

export class CreateStudentDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  age?: number;

  @IsOptional()
  address?: string;

  @IsNotEmpty()
  cls: Classes;
}
