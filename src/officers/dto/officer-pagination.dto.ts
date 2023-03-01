import { IsOptional, IsNumber } from 'class-validator';

export class PaginationOfficerDTO {
  @IsOptional()
  @IsNumber()
  limit?: number = 10;

  @IsOptional()
  skip?: number = 0;
}
