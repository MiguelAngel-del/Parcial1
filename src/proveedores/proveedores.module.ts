import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedore } from './entities/proveedore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedore])],
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
  exports: [ProveedoresService]
})
export class ProveedoresModule {}
