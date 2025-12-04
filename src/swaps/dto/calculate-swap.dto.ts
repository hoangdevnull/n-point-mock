import { IsNumber, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CalculateSwapDto {
  @ApiProperty({
    description: 'Number of points to swap',
    example: 1000,
    minimum: 100,
  })
  @IsNumber()
  @Min(100, { message: 'Minimum swap amount is 100 points' })
  pointsAmount: number;
}
