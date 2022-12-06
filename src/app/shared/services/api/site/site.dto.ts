import { GetAllDto } from '@interfaces';

export interface SiteGetAllDto extends GetAllDto {
  type: string;
  map: boolean;
  maxDistance?: number;
  coordinates?: number[];
}
