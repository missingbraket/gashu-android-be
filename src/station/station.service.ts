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

  async findNearby(lat: number, lng: number, radiusMeters = 300): Promise<Station[]> {
    return this.stationRepo
      .createQueryBuilder('station')
      .where(
        `ST_Distance_Sphere(POINT(station.gpslong, station.gpslati), POINT(:lng, :lat)) < :radius`,
        { lng, lat, radius: radiusMeters },
      )
      .getMany();
  }
}