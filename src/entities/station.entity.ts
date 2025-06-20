import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { RouteStation } from './route_station.entity';

@Entity('STATION')
export class Station {
  @PrimaryColumn()
  nodeid: string;

  @Column({ length: 100 })
  nodenm: string;

  @Column('double', { nullable: true })
  gpslati: number;

  @Column('double', { nullable: true })
  gpslong: number;

  @OneToMany(() => RouteStation, (rs) => rs.station)
  routeStations: RouteStation[];
}