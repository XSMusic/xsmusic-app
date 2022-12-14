import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { GetAllDto, PaginatorI } from '@interfaces';
import { User } from '@models';
import { UserService } from '@services';

const item = new User();
const responseGetAll: PaginatorI<User> = {
  items: [item],
  paginator: {
    pageSize: 0,
    currentPage: 0,
    totalPages: 0,
    total: 0,
  },
};

describe('UserService', () => {
  let httpTestingController: HttpTestingController;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
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
      `${environment.urls.api}/users/getAll`
    );
    req.flush(responseGetAll);
  });

  it('getOne', () => {
    service.getOne({ id: 'id' }).subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/users/one`
    );
    req.flush(item);
  });

  it('create', () => {
    service.create(item).subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/users/create`
    );
    req.flush(item);
  });

  it('update', () => {
    service.update(item).subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/users/update`
    );
    req.flush(item);
  });

  it('deleteOne', () => {
    service.deleteOne('1').subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/users/one/1`
    );
    req.flush(item);
  });
});
