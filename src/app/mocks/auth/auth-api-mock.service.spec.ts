/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthApiMockService } from './auth-api-mock.service';

let authApiMockService;

describe('AuthApiMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthApiMockService]
    });

    authApiMockService = TestBed.get(AuthApiMockService);
  });

  it('should exist', () => {
    expect(authApiMockService).toBeTruthy();
  });

  describe('login', () => {
    it('should be a function', () => {
      expect(typeof authApiMockService.login).toEqual('function');
    });

    it('should return false', () => {
      expect(authApiMockService.login()).toEqual(false);
    })
  });
});
