import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateSchoolDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  address?: string;
}
