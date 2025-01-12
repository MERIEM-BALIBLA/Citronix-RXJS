import { TestBed } from '@angular/core/testing';

import { ArbreService } from './arbre.service';

describe('ArbreService', () => {
  let service: ArbreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArbreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
