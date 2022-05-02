import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { UpdateProductStocksBodyDto } from 'src/shopee/dto';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class ProductStocksService extends TokensService {
  async updateStock(
    dto: { id: string; shopId: string } & UpdateProductStocksBodyDto,
  ) {
    const path = '/api/v2/product/update_stock';

    const url = await this.createSignedUrlWithAccessToken(path, dto.shopId, {
      shop_id: dto.shopId,
    });

    const body = {
      item_id: dto.id,
      stock_list: dto.stockList.map((stock) => ({
        ...(stock.modelId ? { model_id: stock.modelId } : {}),
        normal_stock: stock.normalStock,
      })),
    };

    const { data } = await firstValueFrom(this.httpService.post(url, body));

    return data;
  }
}
