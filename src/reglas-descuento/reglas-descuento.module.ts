import { Module } from '@nestjs/common';
import { ReglasDescuentoService } from './reglas-descuento.service';
import { ReglasDescuentoController } from './reglas-descuento.controller';

@Module({
  controllers: [ReglasDescuentoController],
  providers: [ReglasDescuentoService],
})
export class ReglasDescuentoModule {}
