import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateNinjaDto } from 'src/ninjas/dto/create-ninja.dto';
import { UpdateNinjaDto } from 'src/ninjas/dto/update-ninja.dto';
import { NinjasService } from 'src/ninjas/ninjas.service';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}
  // GET /ninjas?weapon=fast
  @Get()
  getAllNinjas(@Query('weapon') weapon?: 'stars' | 'nunchucks') {
    return this.ninjasService.getAllNinjas(weapon);
  }

  // GET /ninjas/:id
  @Get(':id')
  getOneNinja(@Param('id') id: string) {
    return this.ninjasService.getNinja(+id);
  }

  // POST /ninjas
  @Post()
  createNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  // PUT /ninjas/:id
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.updateNinja(+id, updateNinjaDto);
  }

  // DELETE /ninjas/:id
  @Delete(':id')
  removeNinja(@Param('id') id: string) {
    return this.ninjasService.removeNinja(+id);
  }
}
