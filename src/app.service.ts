import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { ILike, Repository } from 'typeorm';
import { Breed } from './entities/breed.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Breed)
    private readonly breed: Repository<Breed>,
    private readonly httpService: HttpService,
  ) {}
  async getCats() {
    const fetch = await this.httpService
      .get('https://api.thecatapi.com/v1/breeds?limit=1000&page=0')
      .toPromise();
    fetch.data.forEach((e) => {
      if (e.image) {
        this.getCat(e.id, e.image.url);
      } else {
        this.getCat(e.id);
      }
    });
    return fetch.data;
  }

  async getTopSearched(take: number) {
    const res = await this.breed.find({ take, order: { searched: -1 } });
    return res;
  }

  async getCat(
    id: number,
    imgUrl?: string,
  ): Promise<AxiosResponse<any, any> | string> {
    const fetch = await this.httpService
      .get(`https://api.thecatapi.com/v1/breeds/${id}`)
      .toPromise();
    if (!fetch.data.id) return 'id not found';
    const search = await this.breed.findOne({
      where: { apiId: fetch.data.id },
    });
    if (search) {
      this.breed.update(search, { searched: search.searched + 1 });
      return { ...fetch.data, imgUrl: search.imgUrl };
    } else {
      const newBreed = this.breed.save({
        apiId: fetch.data.id,
        name: fetch.data.name,
        desc: fetch.data.description,
        imgUrl: imgUrl
          ? imgUrl
          : `https://cdn2.thecatapi.com/images/${fetch.data.reference_image_id}.jpg`,
        searched: 1,
      });
      return fetch.data;
    }
  }

  CountBreeds() {
    return this.breed.count();
  }

  getCatsByName(name: string) {
    return this.breed.find({
      where: { name: ILike(`%${name}%`) },
      select: ['name', 'apiId'],
    });
  }
}
