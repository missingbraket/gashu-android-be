import { Controller, Get, Query } from '@nestjs/common';
import { StationService } from './station.service';

@Controller('nearby-stations')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Get()
  async getNearby(@Query('lat') lat: string, @Query('lng') lng: string) {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    const stations = await this.stationService.findNearby(latNum, lngNum);
    return { data: stations };
  }
}