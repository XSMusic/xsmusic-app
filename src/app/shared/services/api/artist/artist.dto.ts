import { GetAllDto } from '@interfaces';

export interface ArtistGetAllDto extends GetAllDto {
  filter?: string[];
}
