import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from '../entities/route.entity';
import { RouteStation } from '../entities/route_station.entity';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Route, RouteStation])],
  providers: [RouteService],
  controllers: [RouteController],
})
export class RouteModule {}