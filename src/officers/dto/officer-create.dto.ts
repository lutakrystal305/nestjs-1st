import { IsNotEmpty, IsOptional } from 'class-validator';
import { Classes } from 'src/classes/classes.entity';

export class CreateOfficerDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  major: string;

  @IsOptional()
  cls: Classes;
}
