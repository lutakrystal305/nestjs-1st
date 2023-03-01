import { IsOptional, IsString } from 'class-validator';

export class UpdateSchoolDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
