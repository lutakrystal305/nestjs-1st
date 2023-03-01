import { IsOptional, IsString } from 'class-validator';

export class SearchOfficerDTO {
  @IsOptional()
  @IsString()
  key: string;
}
