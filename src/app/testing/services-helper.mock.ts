import { Artist } from '@models';
import { Observable, of } from 'rxjs';

export const getAllGeneric = (): Observable<any> => of([]);
export const getOneGeneric = (): Observable<any> => of(new Artist());
