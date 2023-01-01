import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { Artist } from '@models';
import { ApiService } from '@services';
import { GetAllDto, GetOneDto } from './api.dtos';

describe('ApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll', () => {
    const data = new GetAllDto();
    service.getAll('artists', data).subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify([]));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/artists/getAll`
    );
    req.flush([]);
  });

  it('getAllForType', () => {
    const data = new GetAllDto();
    service.getAllForType('artists', data).subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify([]));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/artists/getAllForType`
    );
    req.flush([]);
  });

  it('getOne', () => {
    const data = new GetOneDto();
    service.getOne('artists', data).subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify([]));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/artists/getOne`
    );
    req.flush([]);
  });

  it('create', () => {
    const data = new Artist();
    service.create<Artist>('artists', data).subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(data));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/artists/create`
    );
    req.flush(data);
  });

  it('create', () => {
    const data = new Artist();
    service.update<Artist>('artists', data).subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(data));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/artists/update`
    );
    req.flush(data);
  });

  it('deleteOne', () => {
    const response = { message: 'ok' };
    service.deleteOne('artists', 'id').subscribe((response) => {
      expect(JSON.stringify(response)).toEqual(JSON.stringify(response));
    });
    const req = httpTestingController.expectOne(
      `${environment.urls.api}/artists/one/id`
    );
    req.flush(response);
  });
});
