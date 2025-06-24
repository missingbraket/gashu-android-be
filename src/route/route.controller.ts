import { Controller, Get, Param, Query } from '@nestjs/common';
import { RouteService } from './route.service';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  //(fe)버스번호(routeno) -> routeid
  @Get(':routeno')
  async getRouteByNumber(@Param('routeno') routeno: string) {
    const route = await this.routeService.getRouteByNumber(routeno);
    return { data: route };
  }

  //상하행 판단
  @Get('/direction/:routeid')
  async getDirection(
    @Param('routeid') routeid: string,
    @Query('from') fromNodeId: string,
    @Query('to') toNodeId: string,
  ) {
    const direction = await this.routeService.getDirection(routeid, fromNodeId, toNodeId);
    return direction;
  }

  // 상/하행 구분 -> 맞는 정류장 목록 
  @Get('/directional-nodes/:routeid')
  async getDirectionalNodeIds(
    @Param('routeid') routeid: string,
    @Query('from') fromNodeId: string,
    @Query('to') toNodeId: string,
  ) {
    const nodeIds = await this.routeService.getDirectionalNodeIds(routeid, fromNodeId, toNodeId);
    return { data: nodeIds };
  }

}