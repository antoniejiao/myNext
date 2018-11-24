import { TestBed, inject } from '@angular/core/testing';

import { InstockService } from './instock.service';

describe('InstockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstockService]
    });
  });

  it('should be created', inject([InstockService], (service: InstockService) => {
    expect(service).toBeTruthy();
  }));
});
