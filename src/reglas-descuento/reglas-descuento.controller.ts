import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReglasDescuentoService } from './reglas-descuento.service';
import { CreateReglasDescuentoDto } from './dto/create-reglas-descuento.dto';
import { UpdateReglasDescuentoDto } from './dto/update-reglas-descuento.dto';

@Controller('reglas-descuento')
export class ReglasDescuentoController {
  constructor(private readonly reglasDescuentoService: ReglasDescuentoService) {}

  @Post()
  create(@Body() createReglasDescuentoDto: CreateReglasDescuentoDto) {
    return this.reglasDescuentoService.create(createReglasDescuentoDto);
  }

  @Get()
  findAll() {
    return this.reglasDescuentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reglasDescuentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReglasDescuentoDto: UpdateReglasDescuentoDto) {
    return this.reglasDescuentoService.update(+id, updateReglasDescuentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reglasDescuentoService.remove(+id);
  }
}
