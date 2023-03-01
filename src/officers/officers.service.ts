import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeGets } from 'src/type-get.enum';
import { CreateOfficerDTO } from './dto/officer-create.dto';
import { PaginationOfficerDTO } from './dto/officer-pagination.dto';
import { SearchOfficerDTO } from './dto/officer-search.dto';
import { UpdateOfficerDTO } from './dto/officer-update.dto';
import { Officer } from './officers.entity';
import { OfficersRepository } from './officers.repository';

@Injectable()
export class OfficersService {
  constructor(private officerRepository: OfficersRepository) {}

  async getOfficers(
    type: TypeGets,
    searchDTO: SearchOfficerDTO,
    paginateDTO: PaginationOfficerDTO,
  ): Promise<Officer[]> {
    return this.officerRepository.getOfficers(type, searchDTO, paginateDTO);
  }

  async getOfficerById(id: string): Promise<Officer> {
    const ofc = await this.officerRepository.findOne({
      where: { id },
      relations: { class: true },
    });
    if (!ofc) {
      throw new NotFoundException(`Not found within id: ${id}`);
    }
    return ofc;
  }

  async createOfficer(createDTO: CreateOfficerDTO): Promise<Officer> {
    return this.officerRepository.createOfficer(createDTO);
  }

  async updateOfficer(
    id: string,
    updateDTO: UpdateOfficerDTO,
  ): Promise<Officer> {
    const { name, major, cls } = updateDTO;
    const officer = await this.getOfficerById(id);
    if (!officer) {
      throw new NotFoundException(`Not found within id: ${id}`);
    }
    if (name) officer.name = name;
    if (major) officer.major = major;
    if (cls) officer.class = cls;
    await this.officerRepository.save(officer);
    return officer;
  }

  async deleteOfficer(id: string): Promise<void> {
    const result = await this.officerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Not found within id: ${id}`);
    }
  }
}
