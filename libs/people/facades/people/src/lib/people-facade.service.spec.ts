import { TestBed } from '@angular/core/testing';
import { providePeopleFacadeService } from './people-facade.service';

import { PeopleFacadeService } from './people-facade.service';

describe('PeopleFacadeService', () => {
  let service: PeopleFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [providePeopleFacadeService()],
    });
    service = TestBed.inject(PeopleFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
