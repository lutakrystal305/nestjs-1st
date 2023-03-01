import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { TypeGets } from 'src/type-get.enum';
import { Classes } from './classes.entity';
import { ClassesService } from './classes.service';
import { CreateClassDTO } from './dto/class-create.dto';
import { PaginationClassDTO } from './dto/class-pagination.dto';
import { SearchClassDTO } from './dto/class-search.dto';
import { UpdateClassDTO } from './dto/class-update.dto';

@Controller('classes')
export class ClassesController {
  constructor(private classService: ClassesService) {}

  @Get()
  async getClasses(@Query() search: SearchClassDTO): Promise<Classes[]> {
    if (search.key)
      return this.classService.getClasses(
        TypeGets.QUERY,
        search,
        new PaginationClassDTO(),
      );
    return this.classService.getClasses(
      TypeGets.ALL,
      new SearchClassDTO(),
      new PaginationClassDTO(),
    );
  }

  @Get('/paginate')
  async getClassesByPaginate(
    @Query() pagginate: PaginationClassDTO,
  ): Promise<Classes[]> {
    return this.classService.getClasses(
      TypeGets.PAGINATE,
      new SearchClassDTO(),
      pagginate,
    );
  }

  @Get('/:id')
  async getClassById(@Param('id') id: string): Promise<Classes> {
    return this.classService.getClassById(id);
  }

  @Post()
  createClass(@Body() createDTO: CreateClassDTO): Promise<Classes> {
    return this.classService.createClass(createDTO);
  }

  @Patch('/:id')
  updateClass(
    @Param('id') id: string,
    @Body() updateDTO: UpdateClassDTO,
  ): Promise<Classes> {
    return this.classService.updateClass(id, updateDTO);
  }

  @Delete('/:id')
  deleteClass(@Param('id') id: string): Promise<void> {
    return this.classService.deleteClass(id);
  }

  @Get('/count/:id')
  getAmountBySchool(@Param('id') id: string): Promise<number> {
    return this.classService.countClassBySchool(id);
  }
}
