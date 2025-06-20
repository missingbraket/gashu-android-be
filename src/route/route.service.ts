import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteStation } from '../entities/route_station.entity';
import { Route } from '../entities/route.entity';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(RouteStation)
    private routeStationRepo: Repository<RouteStation>,
    @InjectRepository(Route)
    private routeRepo: Repository<Route>,
  ) {}

  async findRoutesByStation(nodeid: string): Promise<Route[]> {
    const routeIds = await this.routeStationRepo
      .createQueryBuilder('rs')
      .select('rs.routeid')
      .where('rs.nodeid = :nodeid', { nodeid })
      .getRawMany();

    const ids = routeIds.map((r) => r.rs_routeid);

    if (ids.length === 0) return [];

    return await this.routeRepo
      .createQueryBuilder('route')
      .where('route.routeid IN (:...ids)', { ids })
      .getMany();
  }
}