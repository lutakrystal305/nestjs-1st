import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeGets } from 'src/type-get.enum';
import { Classes } from './classes.entity';
import { ClassesRepository } from './classes.repository';
import { CreateClassDTO } from './dto/class-create.dto';
import { PaginationClassDTO } from './dto/class-pagination.dto';
import { SearchClassDTO } from './dto/class-search.dto';
import { UpdateClassDTO } from './dto/class-update.dto';

@Injectable()
export class ClassesService {
  constructor(private classRepository: ClassesRepository) {}

  async getClasses(
    type: TypeGets,
    searchDTO: SearchClassDTO,
    paginateDTO: PaginationClassDTO,
  ): Promise<Classes[]> {
    return this.classRepository.getClasses(type, searchDTO, paginateDTO);
  }

  async getClassById(id: string): Promise<Classes> {
    const cls = await this.classRepository.findOne({
      where: { id },
      relations: { school: true },
    });
    if (!cls) {
      throw new NotFoundException(`Not found within id: ${id}`);
    }
    return cls;
  }

  async createClass(createDTO: CreateClassDTO): Promise<Classes> {
    const cls = await this.classRepository.createClass(createDTO);
    return cls;
  }

  async updateClass(id: string, updateDTO: UpdateClassDTO): Promise<Classes> {
    return this.classRepository.updateClass(id, updateDTO);
  }

  async deleteClass(id: string): Promise<void> {
    const result = await this.classRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Not found within id: ${id}`);
    }
  }

  async countClassBySchool(schoolId: string): Promise<number> {
    return this.classRepository.countClassBySchool(schoolId);
  }
}
