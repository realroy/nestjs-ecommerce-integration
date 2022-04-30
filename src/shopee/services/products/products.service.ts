import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  AddItemsBodyDto,
  DeleteItemBodyDto,
  UpdateItemsBodyDto,
  GetProductsQueryDto,
} from 'src/shopee/dto';
import { ProductEntity } from 'src/shopee/entities';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class ProductsService extends TokensService {
  async getList(dto: GetProductsQueryDto & { shopId: string }) {
    const path = '/api/v2/product/get_list';
    const url = await this.createSignedUrlWithAccessToken(
      path,
      dto.shopId.toString(),
      {
        shop_id: dto.shopId,
        offset: dto.offset,
        page_size: dto.pageSize,
        update_time_from: dto.updateTimeFrom,
        update_time_to: dto.updateTimeTo,
        item_status: dto.itemStatus,
      },
    );

    const { data } = await firstValueFrom(this.httpService.get(url));

    if (data.error.length) {
      throw new Error([data.error, data.message].join(' '));
    }
  }
  async addItem(dto: AddItemsBodyDto & { shopId: string }) {
    const path = '/api/v2/product/add_item';
    const url = await this.createSignedUrlWithAccessToken(
      path,
      dto.shopId.toString(),
      { shop_id: dto.shopId },
    );

    const body = {
      original_price: dto.originalPrice,
      description: dto.description,
      ...(dto.weight ? { weight: dto.weight } : {}),
      item_name: dto.itemName,
      ...(dto.itemStatus ? { item_status: dto.itemStatus } : {}),
      ...(dto.dimension
        ? {
            dimension: {
              package_height: dto.dimension?.packageHeight,
              package_length: dto.dimension?.packageLength,
              package_width: dto.dimension?.packageWidth,
            },
          }
        : {}),
      normal_stock: dto.normalStock,
      logistic_info: dto.logisticInfo.map((logistic) => ({
        ...(logistic.sizeId ? { size_id: logistic.sizeId } : {}),
        ...(logistic.shippingFee ? { shipping_fee: logistic.shippingFee } : {}),
        enabled: logistic.enabled,
        ...(logistic.logisticId ? { logistic_id: logistic.logisticId } : {}),
        ...(logistic.isFree ? { is_free: logistic.isFree } : {}),
      })),
      ...(dto.attributeList
        ? {
            attribute_list: dto.attributeList.map((attribute) => ({
              attribute_id: attribute.attributeId,
              ...(attribute.attributeValueList
                ? {
                    attribute_value_list: attribute.attributeValueList.map(
                      (attributeValue) => ({
                        value_id: attributeValue.valueId,
                        ...(attributeValue.originalValueName
                          ? {
                              original_value_name:
                                attributeValue.originalValueName,
                            }
                          : {}),
                        ...(attributeValue.valueUnit
                          ? { value_unit: attributeValue.valueUnit }
                          : {}),
                      }),
                    ),
                  }
                : {}),
            })),
          }
        : {}),
      category_id: dto.categoryId,
      image: {
        image_id_list: dto.image.imageIdList,
      },
      ...(dto.preOrder ? { pre_order: dto.preOrder } : {}),
      ...(dto.itemSku ? { item_sku: dto.itemSku } : {}),
      ...(dto.condition ? { condition: dto.condition } : {}),
      ...(dto.wholesale
        ? {
            wholesale: dto.wholesale?.map?.((wholesale) => ({
              min_count: wholesale.minCount,
              max_count: wholesale.maxCount,
              unit_price: wholesale.unitPrice,
            })),
          }
        : {}),
      ...(dto.videoUploadId ? { video_upload_id: dto.videoUploadId } : {}),
      ...(dto.brand
        ? {
            brand: {
              brand_id: dto.brand.brandId,
              original_brand_name: dto.brand.originalBrandName,
            },
          }
        : {}),
      ...(dto.itemDangerous ? { item_dangerous: dto.itemDangerous } : {}),
      ...(dto.taxInfo
        ? {
            tax_info: {
              ...(dto.taxInfo.ncm ? { ncm: dto.taxInfo.ncm } : {}),
              ...(dto.taxInfo.sameStateCfop
                ? { same_state_cfop: dto.taxInfo.sameStateCfop }
                : {}),
              ...(dto.taxInfo.diffStateCfop
                ? { diff_state_cfop: dto.taxInfo.diffStateCfop }
                : {}),
              ...(dto.taxInfo.csosn ? { csosn: dto.taxInfo.csosn } : {}),
              ...(dto.taxInfo.origin ? { origin: dto.taxInfo.origin } : {}),
              ...(dto.taxInfo.cest ? { cest: dto.taxInfo.cest } : {}),
              ...(dto.taxInfo.measureUnit
                ? { measure_unit: dto.taxInfo.measureUnit }
                : {}),
              ...(dto.taxInfo.invoiceOption
                ? { invoice_option: dto.taxInfo.invoiceOption }
                : {}),
              ...(dto.taxInfo.vatRate ? { vat_rate: dto.taxInfo.vatRate } : {}),
              hs_code: dto.taxInfo.hsCode,
              tax_code: dto.taxInfo.taxCode,
            },
          }
        : {}),
      ...(dto.complaintPolicy
        ? {
            complaint_policy: {
              ...(dto.complaintPolicy.warrantyTime
                ? { warranty_time: dto.complaintPolicy.warrantyTime }
                : {}),
              ...(dto.complaintPolicy.excludeEntrepreneurWarranty
                ? {
                    exclude_entrepreneur_warranty:
                      dto.complaintPolicy.excludeEntrepreneurWarranty,
                  }
                : {}),
              ...(dto.complaintPolicy.complaintAddressId
                ? {
                    complaint_address_id:
                      dto.complaintPolicy.complaintAddressId,
                  }
                : {}),
              ...(dto.complaintPolicy.additionalInformation
                ? {
                    additional_information:
                      dto.complaintPolicy.additionalInformation,
                  }
                : {}),
            },
          }
        : {}),
      ...(dto.descriptionInfo
        ? {
            description_info: {
              ...(dto.descriptionInfo.extendedDescription
                ? {
                    extended_description: {
                      field_list:
                        dto.descriptionInfo.extendedDescription.fieldList.map(
                          (field) => ({
                            ...(field.fieldType
                              ? { field_type: field.fieldType }
                              : {}),
                            ...(field.text ? { text: field.text } : {}),
                            ...(field.imageInfo
                              ? {
                                  image_info: {
                                    image_id: field.imageInfo.imageId,
                                  },
                                }
                              : {}),
                          }),
                        ),
                    },
                  }
                : {}),
            },
          }
        : {}),
      ...(dto.descriptionType ? { description_type: dto.descriptionType } : {}),
    };

    const { data } = await firstValueFrom(this.httpService.post(url, body));

    if (data.error.length) {
      throw new Error([data.error, data.message].join(' '));
    }

    const product = new ProductEntity();
    product.id = data?.response?.item_id;
    product.data = data?.response;
    product.sku = data?.response?.item_sku;

    await product.save();

    return product;
  }

  async updateItem(dto: UpdateItemsBodyDto & { shopId: string }) {
    const path = '/api/v2/product/update_item';
    const url = await this.createSignedUrlWithAccessToken(
      path,
      dto.shopId.toString(),
      { shop_id: dto.shopId },
    );

    const body = {
      item_id: dto.itemId,
      description: dto.description,
      ...(dto.weight ? { weight: dto.weight } : {}),
      item_name: dto.itemName,
      ...(dto.itemStatus ? { item_status: dto.itemStatus } : {}),
      ...(dto.dimension
        ? {
            dimension: {
              package_height: dto.dimension?.packageHeight,
              package_length: dto.dimension?.packageLength,
              package_width: dto.dimension?.packageWidth,
            },
          }
        : {}),
      logistic_info: dto.logisticInfo.map((logistic) => ({
        ...(logistic.sizeId ? { size_id: logistic.sizeId } : {}),
        ...(logistic.shippingFee ? { shipping_fee: logistic.shippingFee } : {}),
        enabled: logistic.enabled,
        ...(logistic.logisticId ? { logistic_id: logistic.logisticId } : {}),
        ...(logistic.isFree ? { is_free: logistic.isFree } : {}),
      })),
      ...(dto.attributeList
        ? {
            attribute_list: dto.attributeList.map((attribute) => ({
              attribute_id: attribute.attributeId,
              ...(attribute.attributeValueList
                ? {
                    attribute_value_list: attribute.attributeValueList.map(
                      (attributeValue) => ({
                        value_id: attributeValue.valueId,
                        ...(attributeValue.originalValueName
                          ? {
                              original_value_name:
                                attributeValue.originalValueName,
                            }
                          : {}),
                        ...(attributeValue.valueUnit
                          ? { value_unit: attributeValue.valueUnit }
                          : {}),
                      }),
                    ),
                  }
                : {}),
            })),
          }
        : {}),
      category_id: dto.categoryId,
      image: {
        image_id_list: dto.image.imageIdList,
      },
      ...(dto.preOrder ? { pre_order: dto.preOrder } : {}),
      ...(dto.itemSku ? { item_sku: dto.itemSku } : {}),
      ...(dto.condition ? { condition: dto.condition } : {}),
      ...(dto.wholesale
        ? {
            wholesale: dto.wholesale?.map?.((wholesale) => ({
              min_count: wholesale.minCount,
              max_count: wholesale.maxCount,
              unit_price: wholesale.unitPrice,
            })),
          }
        : {}),
      ...(dto.videoUploadId ? { video_upload_id: dto.videoUploadId } : {}),
      ...(dto.brand
        ? {
            brand: {
              brand_id: dto.brand.brandId,
              original_brand_name: dto.brand.originalBrandName,
            },
          }
        : {}),
      ...(dto.itemDangerous ? { item_dangerous: dto.itemDangerous } : {}),
      ...(dto.taxInfo
        ? {
            tax_info: {
              ...(dto.taxInfo.ncm ? { ncm: dto.taxInfo.ncm } : {}),
              ...(dto.taxInfo.sameStateCfop
                ? { same_state_cfop: dto.taxInfo.sameStateCfop }
                : {}),
              ...(dto.taxInfo.diffStateCfop
                ? { diff_state_cfop: dto.taxInfo.diffStateCfop }
                : {}),
              ...(dto.taxInfo.csosn ? { csosn: dto.taxInfo.csosn } : {}),
              ...(dto.taxInfo.origin ? { origin: dto.taxInfo.origin } : {}),
              ...(dto.taxInfo.cest ? { cest: dto.taxInfo.cest } : {}),
              ...(dto.taxInfo.measureUnit
                ? { measure_unit: dto.taxInfo.measureUnit }
                : {}),
              ...(dto.taxInfo.invoiceOption
                ? { invoice_option: dto.taxInfo.invoiceOption }
                : {}),
              ...(dto.taxInfo.vatRate ? { vat_rate: dto.taxInfo.vatRate } : {}),
              hs_code: dto.taxInfo.hsCode,
              tax_code: dto.taxInfo.taxCode,
            },
          }
        : {}),
      ...(dto.complaintPolicy
        ? {
            complaint_policy: {
              ...(dto.complaintPolicy.warrantyTime
                ? { warranty_time: dto.complaintPolicy.warrantyTime }
                : {}),
              ...(dto.complaintPolicy.excludeEntrepreneurWarranty
                ? {
                    exclude_entrepreneur_warranty:
                      dto.complaintPolicy.excludeEntrepreneurWarranty,
                  }
                : {}),
              ...(dto.complaintPolicy.complaintAddressId
                ? {
                    complaint_address_id:
                      dto.complaintPolicy.complaintAddressId,
                  }
                : {}),
              ...(dto.complaintPolicy.additionalInformation
                ? {
                    additional_information:
                      dto.complaintPolicy.additionalInformation,
                  }
                : {}),
            },
          }
        : {}),
      ...(dto.descriptionInfo
        ? {
            description_info: {
              ...(dto.descriptionInfo.extendedDescription
                ? {
                    extended_description: {
                      field_list:
                        dto.descriptionInfo.extendedDescription.fieldList.map(
                          (field) => ({
                            ...(field.fieldType
                              ? { field_type: field.fieldType }
                              : {}),
                            ...(field.text ? { text: field.text } : {}),
                            ...(field.imageInfo
                              ? {
                                  image_info: {
                                    image_id: field.imageInfo.imageId,
                                  },
                                }
                              : {}),
                          }),
                        ),
                    },
                  }
                : {}),
            },
          }
        : {}),
      ...(dto.descriptionType ? { description_type: dto.descriptionType } : {}),
    };

    const { data } = await firstValueFrom(this.httpService.post(url, body));

    if (data.error.length) {
      throw new Error([data.error, data.message].join(' '));
    }

    const product = new ProductEntity();
    product.id = dto.itemId.toString();
    product.data = data.response;

    await product.save();

    return data;
  }

  async deleteItem(dto: DeleteItemBodyDto & { shopId: string }) {
    const path = '/api/v2/product/delete_item';
    const url = await this.createSignedUrlWithAccessToken(
      path,
      dto.shopId.toString(),
      { shop_id: dto.shopId },
    );

    const body = {
      item_id: dto.itemId,
    };

    const { data } = await firstValueFrom(this.httpService.post(url, body));

    if (data.error.length) {
      throw new Error([data.error, data.message].join(' '));
    }

    await ProductEntity.delete({ id: dto.itemId.toString() });

    return data;
  }
}
