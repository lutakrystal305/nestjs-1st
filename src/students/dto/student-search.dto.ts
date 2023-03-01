import { IsOptional, IsString } from 'class-validator';

export class SearchStudentDTO {
  @IsOptional()
  @IsString()
  key: string;
}
