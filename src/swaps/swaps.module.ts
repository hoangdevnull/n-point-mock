import { Module } from '@nestjs/common';
import { SwapsController } from './swaps.controller';

@Module({
  controllers: [SwapsController],
})
export class SwapsModule {}
