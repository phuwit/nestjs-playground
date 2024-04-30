import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BeltGuard } from 'src/belt/belt.guard';
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
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getNinja(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // POST /ninjas
  @Post()
  @UseGuards(BeltGuard)
  createNinja(@Body(ValidationPipe) createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  // PUT /ninjas/:id
  @Put(':id')
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjasService.updateNinja(id, updateNinjaDto);
  }

  // DELETE /ninjas/:id
  @Delete(':id')
  removeNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjasService.removeNinja(id);
  }
}
