export interface GetAllDto {
  page: number;
  pageSize: number;
  order: string[];
  filter?: string[];
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

export interface SearchDto {
  value: string;
  limit: number;
}
