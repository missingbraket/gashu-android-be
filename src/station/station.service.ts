import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from '../entities/station.entity';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(Station)
    private stationRepo: Repository<Station>,
  ) {}

  async findNearby(lat: number, lng: number, radius = 0.005): Promise<Station[]> {
    // 위도/경도 단위로 반경 약 500m
    return await this.stationRepo
      .createQueryBuilder('station')
      .where('ABS(station.gpslati - :lat) < :radius', { lat, radius })
      .andWhere('ABS(station.gpslong - :lng) < :radius', { lng, radius })
      .getMany();
  }
}