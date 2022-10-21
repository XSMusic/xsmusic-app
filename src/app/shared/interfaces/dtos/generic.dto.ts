export interface GetAllDto {
  page: number;
  pageSize: number;
  order: string[];
}

export interface IdDto {
  id: string;
}

export interface SlugDto {
  slug: string;
}

export interface IdSiteDto {
  id: string;
  site: string;
}
