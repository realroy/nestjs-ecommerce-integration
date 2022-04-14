import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from 'src/shopee/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(ShopEntity)
    private shopRepository: Repository<ShopEntity>,
  ) {}
  getMany() {
    return this.shopRepository.find({});
  }
}
