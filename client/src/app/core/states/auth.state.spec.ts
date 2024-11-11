import { TestBed } from '@angular/core/testing';

import { AuthState } from './auth.state';

describe('AuthState', () => {
  let state: AuthState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    state = TestBed.inject(AuthState);
  });

  it('should be created', () => {
    expect(state).toBeTruthy();
  });
});
