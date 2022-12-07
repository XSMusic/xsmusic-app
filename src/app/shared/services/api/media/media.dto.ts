import { GetAllDto } from "@interfaces";

export interface MediaGetAllForTypeDto extends GetAllDto {
  id: string;
  type: string;
  typeMedia: string;
}
