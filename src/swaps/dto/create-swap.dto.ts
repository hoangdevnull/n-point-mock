import { IsNumber, Min, Max, IsString, IsEthereumAddress, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSwapDto {
  @ApiProperty({
    description: 'Number of paid points to swap to tokens',
    example: 1000,
    minimum: 100,
    maximum: 50000,
  })
  @IsNumber()
  @Min(100, { message: 'Minimum swap amount is 100 points' })
  @Max(50000, { message: 'Maximum swap amount is 50000 points per transaction' })
  pointsAmount: number;

  @ApiProperty({
    description: 'Wallet address to receive tokens (Ethereum format)',
    example: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  })
  @IsString()
  walletAddress: string;

  @ApiProperty({
    description: 'Optional idempotency key to prevent duplicate swaps',
    example: 'swap-2025-12-04-001',
    required: false,
  })
  @IsOptional()
  @IsString()
  idempotencyKey?: string;
}
