import { Injectable } from '@nestjs/common';
import { RouteStationService } from '../route_station/route_station.service';

@Injectable()
export class DirectionService {
  constructor(private readonly routeStationService: RouteStationService) {}

  async getDirection(routeid: string, userNodeId: string, destNodeId: string): Promise<'up' | 'down' | 'unknown'> {
    const stations = await this.routeStationService.getRouteStations(routeid);

    const userOrd = stations.find((s) => s.nodeid === userNodeId)?.nodeord;
    const destOrd = stations.find((s) => s.nodeid === destNodeId)?.nodeord;

    if (userOrd == null || destOrd == null) return 'unknown';
    return userOrd < destOrd ? 'up' : 'down';
  }
}