export interface GetAllDto {
  page: number;
  pageSize: number;
  order: string[];
  filter?: string[];
  type?: any;
}

export interface IdDto {
  id: string;
}

export interface IdSlugDto {
  id?: string;
  slug?: string;
}

export interface SlugDto {
  slug: string;
}

export interface IdSiteDto {
  id: string;
  site: string;
}
