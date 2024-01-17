import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { orderedGuard } from './ordered.guard';

describe('orderedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => orderedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
