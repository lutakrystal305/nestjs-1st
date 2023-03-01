import { IsOptional, IsString } from 'class-validator';
import { Classes } from 'src/classes/classes.entity';

export class UpdateOfficerDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  major?: string;

  @IsOptional()
  cls?: Classes;
}
