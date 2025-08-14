import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { StockModule } from '../stock/stock.module';
import { Producto } from './entities/producto.entity';
import { Categoria } from '../categorias/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Categoria]), StockModule],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService],
})
export class ProductosModule {}
