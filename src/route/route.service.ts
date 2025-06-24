import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from '../entities/route.entity';
import { RouteStation } from '../entities/route_station.entity';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private routeRepo: Repository<Route>,
    @InjectRepository(RouteStation)
    private routeStationRepo: Repository<RouteStation>,
  ) {}

  async getRouteByNumber(routeno: string): Promise<Route | null> {
    return await this.routeRepo.findOne({ where: { routeno } });
  }

  async getStationsByRoute(routeid: string): Promise<RouteStation[]> {
    return await this.routeStationRepo.find({
      where: { routeid },
      order: { nodeord: 'ASC' },
    });
  }

  //상하행
  async getDirection(routeid: string, fromNodeId: string, toNodeId: string) {
    const from = await this.routeStationRepo.findOne({
      where: { routeid, nodeid: fromNodeId },
    });

    const to = await this.routeStationRepo.findOne({
      where: { routeid, nodeid: toNodeId },
    });

    if (!from || !to) {
      return { error: 'Invalid nodeids for the given route' };
    }

    const direction = from.nodeord < to.nodeord ? 'up' : 'down';

    return {
      routeid,
      fromNodeId,
      toNodeId,
      fromNodeOrd: from.nodeord,
      toNodeOrd: to.nodeord,
      direction,
    };
  }

  async getDirectionalNodeIds(
    routeid: string,
    fromNodeId: string,
    toNodeId: string,
  ): Promise<string[]> {
    const stops = await this.routeStationRepo.find({
      where: { routeid },
      order: { nodeord: 'ASC' },
    });

    const from = stops.find((s) => s.nodeid === fromNodeId);
    const to = stops.find((s) => s.nodeid === toNodeId);

    if (!from || !to) {
      throw new Error('출발지 또는 목적지 정류장이 노선에 없습니다.');
    }

    const isForward = to.nodeord > from.nodeord;

    const filtered = stops.filter((s) =>
      isForward
        ? s.nodeord >= from.nodeord && s.nodeord <= to.nodeord
        : s.nodeord <= from.nodeord && s.nodeord >= to.nodeord,
    );

    return filtered.map((s) => s.nodeid);
  }

}