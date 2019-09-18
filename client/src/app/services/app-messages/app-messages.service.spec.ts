import { TestBed } from '@angular/core/testing';

import { AppMessagesService } from './app-messages.service';

describe('AppMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppMessagesService = TestBed.get(AppMessagesService);
    expect(service).toBeTruthy();
  });
});
