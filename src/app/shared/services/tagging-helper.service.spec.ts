import { TestBed } from '@angular/core/testing';

import { TaggingHelperService } from './tagging-helper.service';

describe('TaggingHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaggingHelperService = TestBed.get(TaggingHelperService);
    expect(service).toBeTruthy();
  });
});
