export interface UserGetAllDto {
    page: number;
    pageSize: number;
    site: string;
    order: string[];
    onlyFCM?: boolean;
}

export interface UserCreateFakeDto {
    total: number;
}
