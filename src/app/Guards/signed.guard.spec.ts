import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { signedGuard } from './signed.guard';

describe('signedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => signedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
