import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteStation } from '../entities/route_station.entity';

@Injectable()
export class RouteStationService {
  constructor(
    @InjectRepository(RouteStation)
    private repo: Repository<RouteStation>,
  ) {}

  async getRouteStations(routeid: string) {
    return await this.repo.find({
      where: { routeid },
      order: { nodeord: 'ASC' },
    });
  }
}