import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationModule } from './station/station.module';
import { RouteModule } from './route/route.module';
import { ArrivalModule } from './arrival/arrival.module';
import { Station } from './entities/station.entity';
import { Route } from './entities/route.entity';
import { RouteStation } from './entities/route_station.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역 설정으로 사용
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        retryAttempts: configService.get('NODE_ENV') === 'prod' ? 10 : 1,

        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        entities: [Station, Route, RouteStation],
        synchronize: false, // 배포 시 false
        }),
    }),
    StationModule,
    RouteModule,
    ArrivalModule,
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
