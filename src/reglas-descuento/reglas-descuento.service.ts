import { Injectable } from '@nestjs/common';
import { CreateReglasDescuentoDto } from './dto/create-reglas-descuento.dto';
import { UpdateReglasDescuentoDto } from './dto/update-reglas-descuento.dto';

@Injectable()
export class ReglasDescuentoService {
  create(createReglasDescuentoDto: CreateReglasDescuentoDto) {
    return 'This action adds a new reglasDescuento';
  }

  findAll() {
    return `This action returns all reglasDescuento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reglasDescuento`;
  }

  update(id: number, updateReglasDescuentoDto: UpdateReglasDescuentoDto) {
    return `This action updates a #${id} reglasDescuento`;
  }

  remove(id: number) {
    return `This action removes a #${id} reglasDescuento`;
  }
}
