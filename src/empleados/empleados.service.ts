import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private readonly repo: Repository<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const empleado = this.repo.create({ ...createEmpleadoDto });
    return this.repo.save(empleado);
  }

  async findAll(): Promise<Empleado[]> {
    return this.repo.find({ where: { estado: true } });
  }

  async findOne(id: number): Promise<Empleado> {
    const empleado = await this.repo.findOne({ where: { id, estado: true } });
    if (!empleado) throw new NotFoundException('Empleado no encontrado');
    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado> {
    const empleado = await this.findOne(id);
    Object.assign(empleado, updateEmpleadoDto);
    return this.repo.save(empleado);
  }

  async remove(id: number): Promise<boolean> {
    const empleado = await this.findOne(id);
    empleado.estado = false;
    await this.repo.save(empleado);
    return true;
  }
}
