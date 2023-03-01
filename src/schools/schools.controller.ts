import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Post,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { SearchClassDTO } from 'src/classes/dto/class-search.dto';
import { TypeGets } from 'src/type-get.enum';
import { CreateSchoolDTO } from './dto/school-create.dto';
import { PaginationSchoolDTO } from './dto/school-pagination.dto';
import { SearchSchoolDTO } from './dto/school-search.dto';
import { UpdateSchoolDTO } from './dto/school-update.dto';
import { School } from './schools.entity';
import { SchoolsService } from './schools.service';

@Controller('schools')
@UseGuards(AuthGuard())
export class SchoolsController {
  constructor(private schoolService: SchoolsService) {}

  @Get()
  getSchools(
    @Query() search: SearchSchoolDTO,
    @GetUser() user: User,
  ): Promise<School[]> {
    console.log(user);
    if (search.key)
      return this.schoolService.getSchools(TypeGets.QUERY, search, {});
    return this.schoolService.getSchools(
      TypeGets.ALL,
      new SearchClassDTO(),
      new PaginationSchoolDTO(),
    );
  }

  @Get('/paginate')
  getSchoolsByPaginate(
    @Query() paginate: PaginationSchoolDTO,
  ): Promise<School[]> {
    return this.schoolService.getSchools(
      TypeGets.PAGINATE,
      new SearchClassDTO(),
      paginate,
    );
  }
  @Get('/:id')
  getSchoolById(@Param('id') id: string): Promise<School> {
    return this.schoolService.getSchoolById(id);
  }

  @Post()
  createSchool(@Body() createDTO: CreateSchoolDTO): Promise<School> {
    console.log(createDTO);
    return this.schoolService.createSchool(createDTO);
  }

  @Patch('/:id')
  updateSchool(
    @Param('id') id: string,
    @Body() updateDTO: UpdateSchoolDTO,
  ): Promise<School> {
    return this.schoolService.updateSchool(id, updateDTO);
  }

  @Delete('/:id')
  deleteSchool(@Param('id') id: string): Promise<void> {
    return this.schoolService.deleteSchool(id);
  }
}
