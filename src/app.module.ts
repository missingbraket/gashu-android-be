import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'gashu',
      password: '1234',
      database: 'gashu',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 배포 시 false
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
