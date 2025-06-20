import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Station } from './station.entity';
import { Route } from './route.entity';

@Entity('ROUTE_STATION')
export class RouteStation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nodeid: string;

  @Column({ nullable: true })
  routeid: string;

  @Column({ nullable: true })
  nodeord: number;

  @ManyToOne(() => Station, (station) => station.routeStations)
  @JoinColumn({ name: 'nodeid' })
  station: Station;

  @ManyToOne(() => Route, (route) => route.routeStations)
  @JoinColumn({ name: 'routeid' })
  route: Route;
}