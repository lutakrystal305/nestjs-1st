import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { TypeGets } from 'src/type-get.enum';
import { CreateStudentDTO } from './dto/student-create.dto';
import { PaginationStudentDTO } from './dto/student-pagination.dto';
import { SearchStudentDTO } from './dto/student-search.dto';
import { UpdateStudentDTO } from './dto/student-update.dto';
import { Student } from './students.entity';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentsService) {}

  @Get()
  getStudents(@Query() search: SearchStudentDTO): Promise<Student[]> {
    if (search.key)
      return this.studentService.getStudents(
        TypeGets.QUERY,
        search,
        new PaginationStudentDTO(),
      );
    return this.studentService.getStudents(
      TypeGets.ALL,
      new SearchStudentDTO(),
      new PaginationStudentDTO(),
    );
  }

  @Get('/paginate')
  getStudentsByPaginate(paginate: PaginationStudentDTO): Promise<Student[]> {
    return this.studentService.getStudents(
      TypeGets.PAGINATE,
      new SearchStudentDTO(),
      paginate,
    );
  }

  @Get('/:id')
  getStudentById(@Param('id') id: string): Promise<Student> {
    return this.studentService.getStudentById(id);
  }

  @Post()
  createStudent(@Body() createDTO: CreateStudentDTO): Promise<Student> {
    return this.studentService.createStudent(createDTO);
  }

  @Patch('/:id')
  updateStudent(
    @Param('id') id: string,
    @Body() updateDTO: UpdateStudentDTO,
  ): Promise<Student> {
    return this.studentService.updateStudent(id, updateDTO);
  }

  @Delete('/:id')
  deleteStudent(@Param('id') id: string): Promise<void> {
    return this.studentService.deleteStudent(id);
  }
}
