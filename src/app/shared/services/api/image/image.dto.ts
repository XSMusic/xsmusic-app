import { GenericItemType } from '@shared/utils';

export interface ImageUploadDto {
  type: GenericItemType;
  id: string;
}

export interface ImageUploadByUrlDto extends ImageUploadDto {
  url: string;
}

export interface ImageSetFirstImageDto {
  type: string;
  typeId: string;
  imageId: string;
}
