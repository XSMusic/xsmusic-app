export interface PaginatorI<T> {
  items: T[];
  paginator: PaginatorBaseI;
}

interface PaginatorBaseI {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  total: number;
}
