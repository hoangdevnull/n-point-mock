import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PointsModule } from './points/points.module';
import { PurchasesModule } from './purchases/purchases.module';
import { SwapsModule } from './swaps/swaps.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PointsModule,
    PurchasesModule,
    SwapsModule,
  ],
})
export class AppModule {}
