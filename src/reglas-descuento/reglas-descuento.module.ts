import { Module } from '@nestjs/common';
import { ReglasDescuentoService } from './reglas-descuento.service';
import { ReglasDescuentoController } from './reglas-descuento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReglasDescuento } from './entities/reglas-descuento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReglasDescuento])],
  controllers: [ReglasDescuentoController],
  providers: [ReglasDescuentoService],
  exports: [ReglasDescuentoService]
})
export class ReglasDescuentoModule {}
