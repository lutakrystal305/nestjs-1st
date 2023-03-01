import { Injectable } from '@nestjs/common';
import { TypeGets } from 'src/type-get.enum';
import { DataSource, Repository } from 'typeorm';
import { Classes } from './classes.entity';
import { CreateClassDTO } from './dto/class-create.dto';
import { PaginationClassDTO } from './dto/class-pagination.dto';
import { SearchClassDTO } from './dto/class-search.dto';
import { UpdateClassDTO } from './dto/class-update.dto';

@Injectable()
export class ClassesRepository extends Repository<Classes> {
  constructor(private dataSource: DataSource) {
    super(Classes, dataSource.createEntityManager());
  }

  async getClasses(
    type: TypeGets,
    searchDTO: SearchClassDTO,
    paginateDTO: PaginationClassDTO,
  ): Promise<Classes[]> {
    const { key } = searchDTO;
    const { limit, skip } = paginateDTO;
    const query = this.createQueryBuilder('classes');
    if (key && type == TypeGets.QUERY) {
      query.andWhere('LOWER(classes.name) LIKE LOWER(:key)', {
        key: `%${key}%`,
      });
    }
    if (type == TypeGets.PAGINATE) {
      query.skip(skip || 0).take(limit || 10);
    }
    const classes = await query
      .leftJoinAndSelect('classes.school', 'school')
      .leftJoinAndSelect('classes.students', 'student')
      .getMany();
    return classes;
  }

  async createClass(createDTO: CreateClassDTO): Promise<Classes> {
    const { name, school } = createDTO;
    const cls = this.create({
      name,
      description: '123',
      school,
    });
    await this.save(cls);
    return cls;
  }

  async updateClass(id: string, updateDTO: UpdateClassDTO): Promise<Classes> {
    const { name } = updateDTO;
    const cls = await this.findOneBy({ id });
    cls.name = name;
    await this.save(cls);
    return cls;
  }

  async countClassBySchool(schoolId: string): Promise<number> {
    console.log(schoolId);
    const query = this.createQueryBuilder('classes');
    const amount = await query
      .leftJoinAndSelect('classes.school', 'school')
      .where('classes.school.id = :id', { id: schoolId })
      .select('count(classes.id)')
      .execute();
    return amount[0];
  }
}
