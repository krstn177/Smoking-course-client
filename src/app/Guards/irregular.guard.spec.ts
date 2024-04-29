import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { irregularGuard } from './irregular.guard';

describe('irregularGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => irregularGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
