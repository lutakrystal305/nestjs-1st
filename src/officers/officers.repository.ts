import { Injectable } from '@nestjs/common';
import { TypeGets } from 'src/type-get.enum';
import { DataSource, Repository } from 'typeorm';
import { CreateOfficerDTO } from './dto/officer-create.dto';
import { PaginationOfficerDTO } from './dto/officer-pagination.dto';
import { SearchOfficerDTO } from './dto/officer-search.dto';
import { Officer } from './officers.entity';

@Injectable()
export class OfficersRepository extends Repository<Officer> {
  constructor(private dataSource: DataSource) {
    super(Officer, dataSource.createEntityManager());
  }

  async getOfficers(
    type: TypeGets,
    searchDTO: SearchOfficerDTO,
    paginateDTO: PaginationOfficerDTO,
  ): Promise<Officer[]> {
    const { key } = searchDTO;
    const { limit, skip } = paginateDTO;
    const query = this.createQueryBuilder('officer');
    if (key && type == TypeGets.QUERY) {
      query.andWhere('LOWER(officer.name) LIKE LOWER(:key)', {
        key: `%${key}%`,
      });
    }
    if (type == TypeGets.PAGINATE) {
      query.skip(skip || 0).take(limit || 10);
    }
    const officers = await query
      .leftJoinAndSelect('officer.class', 'classes')
      .getMany();
    return officers;
  }

  async createOfficer(createDTO: CreateOfficerDTO): Promise<Officer> {
    const { name, major, cls } = createDTO;
    const officer = this.create({
      name,
      major,
      class: cls,
    });
    await this.save(officer);
    return officer;
  }
}
