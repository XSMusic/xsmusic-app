import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { GetAllDto, PaginatorI } from '@interfaces';
import { Site } from '@models';
import { SiteService } from '@services';
import { SiteGetAllDto } from './site.dto';

const item = new Site();
const responseGetAll: PaginatorI<Site> = {
  items: [item],
  paginator: {
    pageSize: 0,
    currentPage: 0,
    totalPages: 0,
    total: 0,
  },
};

describe('SiteService', () => {
  let httpTestingController: HttpTestingController;
  let service: SiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteService],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SiteService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create', () => {
    service.create(item).subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/sites/create`
    );
    req.flush(item);
  });

  it('update', () => {
    service.update(item).subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/sites/update`
    );
    req.flush(item);
  });

  it('deleteOne', () => {
    service.deleteOne('1').subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/sites/one/1`
    );
    req.flush(item);
  });
});
