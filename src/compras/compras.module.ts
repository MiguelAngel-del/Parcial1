import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';
import { DetalleCompra } from './entities/detalle-compra.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Stock } from '../stock/entities/stock.entity';
import { Lote } from '../lotes/entities/lote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compra, DetalleCompra, Producto, Stock, Lote])],
  controllers: [ComprasController],
  providers: [ComprasService],
  exports: [ComprasService],
})
export class ComprasModule {}
