import { Injectable } from '@nestjs/common';
import { TypeGets } from 'src/type-get.enum';
import { DataSource, Repository } from 'typeorm';
import { CreateSchoolDTO } from './dto/school-create.dto';
import { PaginationSchoolDTO } from './dto/school-pagination.dto';
import { SearchSchoolDTO } from './dto/school-search.dto';
import { School } from './schools.entity';

@Injectable()
export class SchoolsRepository extends Repository<School> {
  constructor(private dataSource: DataSource) {
    super(School, dataSource.createEntityManager());
  }
  async getSchools(
    type: TypeGets,
    searchDTO: SearchSchoolDTO,
    paginateDTO: PaginationSchoolDTO = {},
  ): Promise<School[]> {
    const { key } = searchDTO;
    const { limit, skip } = paginateDTO;
    const query = this.createQueryBuilder('school');
    if (key && type === TypeGets.QUERY) {
      query.andWhere('LOWER(school.name) LIKE LOWER(:key)', {
        key: `%${key}%`,
      });
    }
    if (type === TypeGets.PAGINATE) {
      query.skip(skip || 0).take(limit || 10);
    }
    const schools = await query
      .leftJoinAndSelect('school.classes', 'classes')
      .getMany();
    return schools;
  }

  async createSchool(createDTO: CreateSchoolDTO): Promise<School> {
    // create -> save
    const { name, address } = createDTO;
    const school = this.create({
      name,
      address,
    });
    await this.save(school);
    return school;
  }
}
