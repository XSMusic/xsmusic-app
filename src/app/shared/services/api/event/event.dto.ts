import { GetAllDto } from '@interfaces';

export interface EventGetAllDto extends GetAllDto {
  old?: boolean;
}

export interface EventGetAllForTypeDto extends EventGetAllDto {
  id: string;
  type: string;
}
