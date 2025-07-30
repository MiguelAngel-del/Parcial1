import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, Max, Min } from "class-validator";

export class CreateReglasDescuentoDto {
    @ApiProperty({
        description: 'Porcentaje de descuento que se aplicará',
        example: 15,
    })
    @IsNumber()
    @Min(0)
    @Max(100)
    porcentajeDescuento: number;
}
