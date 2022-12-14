import { PaginatorI } from '@interfaces';
import { Observable, of } from 'rxjs';

export const getAllGeneric = (): Observable<PaginatorI<any>> =>
  of({
    items: [],
    paginator: { pageSize: 0, currentPage: 0, totalPages: 0, total: 0 },
  });
