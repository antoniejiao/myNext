import { TestBed, inject } from '@angular/core/testing';

import { DataMessageService } from './data-message.service';

describe('DataMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataMessageService]
    });
  });

  it('should be created', inject([DataMessageService], (service: DataMessageService) => {
    expect(service).toBeTruthy();
  }));
});
