import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { GetAllDto, PaginatorI } from '@interfaces';
import { Artist } from '@models';
import { ArtistService } from '@services';

const item = new Artist();
const responseGetAll: PaginatorI<Artist> = {
  items: [item],
  paginator: {
    pageSize: 0,
    currentPage: 0,
    totalPages: 0,
    total: 0,
  },
};

describe('ArtistService', () => {
  let httpTestingController: HttpTestingController;
  let service: ArtistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtistService],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ArtistService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll', () => {
    const data: GetAllDto = {
      page: 0,
      pageSize: 0,
      order: [],
    };
    service.getAll(data).subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(responseGetAll));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/artists/getAll`
    );
    req.flush(responseGetAll);
  });

  it('getOne', () => {
    service.getOne('id', 'perro').subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/artists/getOne/id/perro`
    );
    req.flush(item);
  });

  it('create', () => {
    service.create(item).subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/artists/create`
    );
    req.flush(item);
  });

  it('update', () => {
    service.update(item).subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/artists/update`
    );
    req.flush(item);
  });

  it('deleteOne', () => {
    service.deleteOne('1').subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/artists/one/1`
    );
    req.flush(item);
  });
});
