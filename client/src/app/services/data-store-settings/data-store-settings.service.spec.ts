import { TestBed } from '@angular/core/testing';

import { DataStoreSettingsService } from './data-store-settings.service';

describe('DataStoreSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataStoreSettingsService = TestBed.get(DataStoreSettingsService);
    expect(service).toBeTruthy();
  });
});
