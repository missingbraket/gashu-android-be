import { Controller, Get, Param } from '@nestjs/common';
import { ArrivalService } from './arrival.service';

@Controller('arrival')
export class ArrivalController {
  constructor(private readonly arrivalService: ArrivalService) {}

  @Get(':nodeid')
  async getArrival(@Param('nodeid') nodeid: string) {
    const info = await this.arrivalService.getArrivalInfo(nodeid);
    return { data: info };
  }
}


// station/nearby에 프론트에서 받아온 사용자위치를 넣으면 주변정류장이나오잖아 거기서 nodeid를 상행1개, 하행1개 받아올거고..
// 그리고 rout/routeno에는 프론트에서 받아온 버스 번호를 넣어서 routeid를 받아올테고..

// 그럼 프론트에서받은 목적지 경도위도를 활용해서 주변 정류장(station/nearby)을 또 찾은담에.. nodeid를 뽑아서 이 nodeid와 아까 api에서 받아온 nodeid와routeid로 ROUTE_STATION에서 정류장 순서를... 확인하고 상하행을 구분해서 알맞은 nodeid를 알려주면,

// 그걸 스웨거의 arrival/nodeid에 넣어서, 남은 시간을 확인하는거……