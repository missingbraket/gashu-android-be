// arrival.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ArrivalService {
  constructor(private readonly http: HttpService) {}

  async getArrivalInfo(nodeid: string): Promise<any[]> {
    const serviceKey = '';
    const cityCode = '33010'; //일단 청주
    const url = `https://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=${serviceKey}&pageNo=1&numOfRows=100&_type=json&cityCode=${cityCode}&nodeId=${nodeid}`;

    try {
      const response = await lastValueFrom(this.http.get(url));
      const result = response.data;

      const items = result?.response?.body?.items?.item;

      if (!items) return [];

      const arrivalList = Array.isArray(items) ? items : [items];

      return arrivalList.map((item) => ({
        routeid: item.routeid,
        routeno: item.routeno,
        nodenm: item.nodenm,
        arrtime: Number(item.arrtime),
        arrprevstationcnt: Number(item.arrprevstationcnt),
        vehicletp: item.vehicletp,
      }));
    } catch (error) {
      console.error('도착정보 가져오기 오류:', error);
      return [];
    }
  }
}