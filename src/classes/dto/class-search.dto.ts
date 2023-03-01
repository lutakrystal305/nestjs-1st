import { IsOptional, IsString } from 'class-validator';

export class SearchClassDTO {
  @IsOptional()
  @IsString()
  key: string;
}
