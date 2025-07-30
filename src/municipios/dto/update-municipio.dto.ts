import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateMunicipioDto } from './create-municipio.dto';
import { IsString, MinLength, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateMunicipioDto extends PartialType(CreateMunicipioDto) {
    
}
