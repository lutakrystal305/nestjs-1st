import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeGets } from 'src/type-get.enum';
import { CreateStudentDTO } from './dto/student-create.dto';
import { PaginationStudentDTO } from './dto/student-pagination.dto';
import { SearchStudentDTO } from './dto/student-search.dto';
import { UpdateStudentDTO } from './dto/student-update.dto';
import { Student } from './students.entity';
import { StudentRepository } from './students.repository';

@Injectable()
export class StudentsService {
  constructor(private studentRepository: StudentRepository) {}

  async getStudents(
    type: TypeGets,
    searchDTO: SearchStudentDTO,
    paginateDTO: PaginationStudentDTO,
  ): Promise<Student[]> {
    return this.studentRepository.getStudents(type, searchDTO, paginateDTO);
  }

  async getStudentById(id: string): Promise<Student> {
    const std = await this.studentRepository.findOne({
      where: { id },
      relations: { class: true },
    });
    if (!std) {
      throw new NotFoundException(`Not found within id: ${id}`);
    }
    return std;
  }

  async createStudent(createDTO: CreateStudentDTO): Promise<Student> {
    return this.studentRepository.createStudent(createDTO);
  }

  async updateStudent(
    id: string,
    updateDTO: UpdateStudentDTO,
  ): Promise<Student> {
    const { name, age, cls } = updateDTO;
    const std = await this.getStudentById(id);
    if (!std) {
      throw new NotFoundException(`Not found within id: ${id}`);
    }
    if (name) std.name = name;
    if (age) std.age = age;
    if (cls) std.class = cls;
    await this.studentRepository.save(std);
    return std;
  }

  async deleteStudent(id: string): Promise<void> {
    const result = await this.studentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Not found within id: ${id}`);
    }
  }
}
