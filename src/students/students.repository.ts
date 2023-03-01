import { Injectable } from '@nestjs/common';
import { TypeGets } from 'src/type-get.enum';
import { DataSource, Repository } from 'typeorm';
import { CreateStudentDTO } from './dto/student-create.dto';
import { PaginationStudentDTO } from './dto/student-pagination.dto';
import { SearchStudentDTO } from './dto/student-search.dto';
import { Student } from './students.entity';

@Injectable()
export class StudentRepository extends Repository<Student> {
  constructor(private dataSource: DataSource) {
    super(Student, dataSource.createEntityManager());
  }

  async getStudents(
    type: TypeGets,
    searchDTO: SearchStudentDTO,
    paginateDTO: PaginationStudentDTO,
  ): Promise<Student[]> {
    const { key } = searchDTO;
    const { limit, skip } = paginateDTO;
    const query = this.createQueryBuilder('student');
    if (key && type == TypeGets.QUERY) {
      query.andWhere('LOWER(student.name) LIKE LOWER(:key)', {
        key: `%${key}%`,
      });
    }
    if (type == TypeGets.PAGINATE) {
      query.skip(skip || 0).take(limit || 10);
    }
    const students = await query
      .leftJoinAndSelect('student.class', 'classes')
      .getMany();
    return students;
  }

  async createStudent(createDTO: CreateStudentDTO): Promise<Student> {
    const { name, age, address, cls } = createDTO;
    const student = this.create({
      name,
      age,
      address,
      class: cls,
    });
    await this.save(student);
    return student;
  }
}
