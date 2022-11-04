import { GetAllDto } from '@interfaces';

export interface UserGetAllDto extends GetAllDto {
  onlyFCM?: boolean;
}

export interface UserCreateFakeDto {
  total: number;
}
