import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { RouteStation } from './route_station.entity';

@Entity('ROUTE')
export class Route {
  @PrimaryColumn()
  routeid: string;

  @Column({ length: 50 })
  routeno: string;

  @Column({ length: 50, nullable: true })
  startnodenm: string;

  @Column({ length: 50, nullable: true })
  endnodenm: string;

  @Column({ length: 50, nullable: true })
  startvehicletime: string;

  @Column({ length: 50, nullable: true })
  endvehicletime: string;

  @Column({ length: 50, nullable: true })
  routetp: string;

  @OneToMany(() => RouteStation, (rs) => rs.route)
  routeStations: RouteStation[];
}