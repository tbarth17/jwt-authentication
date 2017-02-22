/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthMockService } from './auth-mock.service';

let authMockService;

describe('AuthApiMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthMockService]
    });

    authMockService = TestBed.get(AuthMockService);
  });

  it('should exist', () => {
    expect(authMockService).toBeTruthy();
  });

  describe('login', () => {
    it('should be a function', () => {
      expect(typeof authMockService.login).toEqual('function');
    });

    it('should take two callback functions and call them', () => {
      let callbacks = {
        successCallback : (response) => {
          return response;
        },
        errorCallback : (error) => {
          return response;
        }
      }
      spyOn(callbacks, 'successCallback');
      spyOn(callbacks, 'errorCallback');
      expect(authMockService.login('foo', callbacks.successCallback, callbacks.errorCallback)).toEqual(true);
      expect(callbacks.successCallback).toHaveBeenCalled();
      expect(callbacks.errorCallback).toHaveBeenCalled();
    });
  });

  describe('functions', () => {
    it('should have some of dummy functions that return true', () => {
      expect(authMockService.loggedIn()).toEqual(true);
      expect(authMockService.logOut()).toEqual(true);
      expect(authMockService.getRedirectUrl()).toEqual(true);
    });

  });
});
