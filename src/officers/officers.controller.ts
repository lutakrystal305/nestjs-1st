import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { TypeGets } from 'src/type-get.enum';
import { CreateOfficerDTO } from './dto/officer-create.dto';
import { PaginationOfficerDTO } from './dto/officer-pagination.dto';
import { SearchOfficerDTO } from './dto/officer-search.dto';
import { UpdateOfficerDTO } from './dto/officer-update.dto';
import { Officer } from './officers.entity';
import { OfficersService } from './officers.service';

@Controller('officers')
export class OfficersController {
  constructor(private officerService: OfficersService) {}

  @Get()
  getOfficers(@Query() search: SearchOfficerDTO): Promise<Officer[]> {
    if (search.key)
      return this.officerService.getOfficers(
        TypeGets.QUERY,
        search,
        new PaginationOfficerDTO(),
      );
    return this.officerService.getOfficers(
      TypeGets.ALL,
      new SearchOfficerDTO(),
      new PaginationOfficerDTO(),
    );
  }

  @Get('/paginate')
  getOfficersByPaginate(paginate: PaginationOfficerDTO): Promise<Officer[]> {
    return this.officerService.getOfficers(
      TypeGets.PAGINATE,
      new SearchOfficerDTO(),
      paginate,
    );
  }

  @Get(':id')
  getOfficerById(@Param('id') id: string): Promise<Officer> {
    return this.officerService.getOfficerById(id);
  }

  @Post()
  createOfficer(@Body() createDTO: CreateOfficerDTO): Promise<Officer> {
    return this.officerService.createOfficer(createDTO);
  }

  @Patch('/:id')
  updateOfficer(
    @Param('id') id: string,
    @Body() updateDTO: UpdateOfficerDTO,
  ): Promise<Officer> {
    return this.officerService.updateOfficer(id, updateDTO);
  }

  @Delete('/:id')
  deleteOfficer(@Param('id') id: string): Promise<void> {
    return this.officerService.deleteOfficer(id);
  }
}
