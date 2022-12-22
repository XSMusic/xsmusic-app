export interface ImageUploadDto {
  type: 'artist' | 'event' | 'media' | 'site' | 'user';
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
