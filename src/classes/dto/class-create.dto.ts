import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { School } from 'src/schools/schools.entity';

export class CreateClassDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  school: School;
}
