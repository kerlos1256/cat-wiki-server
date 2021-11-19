import { Controller, Get, Param, Query } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getCats() {
    return this.appService.getCats();
  }

  @Get('search/top')
  getTopSearched(@Query('limit') limit: string) {
    const Limit = limit ? JSON.parse(limit) : 10;
    return this.appService.getTopSearched(Limit);
  }

  @Get('search/:id')
  getCat(@Param('id') id: number): Promise<AxiosResponse<any, any> | string> {
    return this.appService.getCat(id);
  }

  @Get('search/name/:name')
  getCatsByName(@Param('name') name: string) {
    return this.appService.getCatsByName(name);
  }

  @Get('count')
  getBreedCount() {
    return this.appService.CountBreeds();
  }
}
