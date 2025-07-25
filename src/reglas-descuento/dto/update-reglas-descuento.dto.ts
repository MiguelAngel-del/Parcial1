import { PartialType } from '@nestjs/mapped-types';
import { CreateReglasDescuentoDto } from './create-reglas-descuento.dto';

export class UpdateReglasDescuentoDto extends PartialType(CreateReglasDescuentoDto) {}
