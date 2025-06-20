import { Controller, Get, Param } from '@nestjs/common';
import { RouteService } from './route.service';

@Controller('routes-by-station')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get(':nodeid')
  async getRoutes(@Param('nodeid') nodeid: string) {
    const routes = await this.routeService.findRoutesByStation(nodeid);
    return { data: routes };
  }
}