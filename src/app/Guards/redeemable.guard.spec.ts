import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { redeemableGuard } from './redeemable.guard';

describe('redeemableGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => redeemableGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
