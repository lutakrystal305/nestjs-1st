import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeGets } from 'src/type-get.enum';
import { CreateSchoolDTO } from './dto/school-create.dto';
import { PaginationSchoolDTO } from './dto/school-pagination.dto';
import { SearchSchoolDTO } from './dto/school-search.dto';
import { UpdateSchoolDTO } from './dto/school-update.dto';
import { School } from './schools.entity';
import { SchoolsRepository } from './schools.repository';

@Injectable()
export class SchoolsService {
  constructor(private schoolRepository: SchoolsRepository) {}

  async getSchools(
    type: TypeGets,
    searchDTO: SearchSchoolDTO,
    paginateDTO: PaginationSchoolDTO,
  ): Promise<School[]> {
    return this.schoolRepository.getSchools(type, searchDTO, paginateDTO);
  }

  async getSchoolById(id: string): Promise<School> {
    const sch = await this.schoolRepository.findOne({
      where: { id },
      relations: { classes: true },
    });
    if (!sch) {
      throw new NotFoundException(`Not found within id: ${id}`);
    }
    return sch;
  }

  async createSchool(createDTO: CreateSchoolDTO): Promise<School> {
    return this.schoolRepository.createSchool(createDTO);
  }

  async updateSchool(id: string, updateDTO: UpdateSchoolDTO): Promise<School> {
    const { name, address } = updateDTO;
    const sch = await this.getSchoolById(id);
    if (!sch) {
      throw new NotFoundException(`Not found within id: ${id}`);
    }
    if (name) sch.name = name;
    if (address) sch.address = address;
    await this.schoolRepository.save(sch);
    return sch;
  }

  async deleteSchool(id: string): Promise<void> {
    const result = await this.schoolRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Not found within id: ${id}`);
    }
  }
}
