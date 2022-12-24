import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { GetAllDto, PaginatorI } from '@interfaces';
import { Event } from '@models';
import { EventService } from '@services';
import { EventGetAllForTypeDto } from './event.dto';

const item = new Event();
const responseGetAll: PaginatorI<Event> = {
  items: [item],
  paginator: {
    pageSize: 0,
    currentPage: 0,
    totalPages: 0,
    total: 0,
  },
};

describe('EventService', () => {
  let httpTestingController: HttpTestingController;
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventService],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(EventService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllForType', () => {
    const data: EventGetAllForTypeDto = {
      page: 0,
      pageSize: 0,
      order: [],
      id: '1',
      type: 'artist',
    };
    service.getAllForType(data).subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(responseGetAll));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/events/getAllForType`
    );
    req.flush(responseGetAll);
  });

  it('create', () => {
    service.create(item).subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/events/create`
    );
    req.flush(item);
  });

  it('update', () => {
    service.update(item).subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/events/update`
    );
    req.flush(item);
  });

  it('deleteOne', () => {
    service.deleteOne('1').subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(item));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/events/one/1`
    );
    req.flush(item);
  });
});
