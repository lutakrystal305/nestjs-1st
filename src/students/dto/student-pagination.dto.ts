import { IsNumber, IsOptional } from 'class-validator';

export class PaginationStudentDTO {
  @IsOptional()
  @IsNumber()
  limit?: number = 10;

  @IsOptional()
  skip?: number = 0;
}
