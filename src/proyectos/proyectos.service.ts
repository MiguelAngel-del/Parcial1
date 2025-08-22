import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Proyecto } from './entities/proyecto.entity';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly repo: Repository<Proyecto>,
  ) {}

  async create(createProyectoDto: CreateProyectoDto): Promise<Proyecto> {
    const proyecto = this.repo.create({ ...createProyectoDto });
    return this.repo.save(proyecto);
  }

  async findAll(): Promise<Proyecto[]> {
    return this.repo.find({ where: { estado: true }, relations: ['empleados'] });
  }

  async findOne(id: number): Promise<Proyecto> {
    const proyecto = await this.repo.findOne({ where: { id, estado: true }, relations: ['empleados'] });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');
    return proyecto;
  }

  async update(id: number, updateProyectoDto: UpdateProyectoDto): Promise<Proyecto> {
    const proyecto = await this.findOne(id);
    Object.assign(proyecto, updateProyectoDto);
    return this.repo.save(proyecto);
  }

  async remove(id: number): Promise<boolean> {
    const proyecto = await this.findOne(id);
    proyecto.estado = false;
    await this.repo.save(proyecto);
    return true;
  }
}
