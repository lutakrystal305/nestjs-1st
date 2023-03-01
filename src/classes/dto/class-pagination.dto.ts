import { IsNumber, IsOptional } from 'class-validator';

export class PaginationClassDTO {
  @IsOptional()
  limit?: number = 10;

  @IsOptional()
  skip?: number = 0;
}
