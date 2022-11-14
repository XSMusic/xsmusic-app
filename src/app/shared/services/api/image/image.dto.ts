export interface ImageUploadDto {
  type: string;
  id: string;
}

export interface ImageUploadByUrlDto {
  id: string;
  url: string;
  type: 'artist' | 'media' | 'site' | 'user';
}

export interface ImageSetFirstImageDto {
  type: string;
  typeId: string;
  imageId: string;
}
