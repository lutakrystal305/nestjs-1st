import { IsOptional, IsString } from 'class-validator';

export class SearchSchoolDTO {
  @IsOptional()
  @IsString()
  key: string;
}
