// arrival.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ArrivalService } from './arrival.service';
import { ArrivalController } from './arrival.controller';

@Module({
  imports: [HttpModule],
  controllers: [ArrivalController],
  providers: [ArrivalService],
})
export class ArrivalModule {}