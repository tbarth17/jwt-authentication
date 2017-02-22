/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Observable } from "rxjs/Rx";

import { AuthApiService } from '../auth/auth-api.service';
import { AuthApiMockService } from '../mocks/auth/auth-api-mock.service';
import { tokenNotExpired } from 'angular2-jwt';
import { tokenNotExpiredMock } from '../mocks/token-not-expired-mock';

let authService;
let authApiService;

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: AuthApiService, useClass: AuthApiMockService },
        // tokenNotExpiredMock not functioning properly yet
        {provide: tokenNotExpired, useClass: tokenNotExpiredMock }
      ]
    });

    authService = TestBed.get(AuthService);
    authApiService = TestBed.get(AuthApiService);
  });

  it('should exist', () => {
    expect(authService).toBeTruthy();
  });

  describe('login', () => {
    it('should be a function', () => {
      expect(typeof authService.login).toEqual('function');
    });

    it('should call the AuthApiService and call the success callbacks upon success', () => {
      spyOn(authApiService, 'login').and.returnValue(Observable.of({foo:'bar'}));
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
      spyOn(authService, 'processSuccess');
      authService.login({foo:'bar'}, callbacks.successCallback, callbacks.errorCallback);
      expect(callbacks.successCallback).toHaveBeenCalledWith({foo:'bar'});
      expect(authService.processSuccess).toHaveBeenCalledWith({foo:'bar'});
      expect(callbacks.errorCallback).not.toHaveBeenCalled();
    });

    it('should call the AuthApiService and call the error callbacks upon error', () => {
      spyOn(authApiService, 'login').and.returnValue(Observable.throw({error: 'oops'}));
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
      spyOn(authService, 'processError');
      authService.login({foo:'bar'}, callbacks.successCallback, callbacks.errorCallback);
      expect(callbacks.errorCallback).toHaveBeenCalled();
      expect(authService.processError).toHaveBeenCalledWith({error: 'oops'});
      expect(callbacks.successCallback).not.toHaveBeenCalled();
    });
  });

  describe('loggedIn', () => {
    it('should be a function', () => {
      expect(typeof authService.loggedIn).toEqual('function');
    });

    it('should return the value from tokenNotExpired', () => {
      // TODO: this is not currently using the mock properly, and is using the service itself
      // looking for better documentation as to how to properly mock/spy on this function
      expect(authService.loggedIn()).toEqual(false);
    })
  });

  describe('logOut', () => {
    it('should be a function', () => {
      expect(typeof authService.logOut).toEqual('function');
    });

    it('should call localStorage.removeItem with "id_token"', () => {
      spyOn(localStorage, 'removeItem');
      authService.logOut();
      expect(localStorage.removeItem).toHaveBeenCalledWith('id_token');
    })
  });

  describe('setUrl', () => {
    it('should be a function', () => {
      expect(typeof authService.setUrl).toEqual('function');
    });

    it('should set the value of this.redirectUrl', () => {
      expect(authService.redirectUrl).toEqual('');
      authService.setUrl('/foo');
      expect(authService.redirectUrl).toEqual('/foo');
    })
  });

  describe('getRedirectUrl', () => {
    it('should be a function', () => {
      expect(typeof authService.getRedirectUrl).toEqual('function');
    });

    it('should return the value of this.redirectUrl', () => {
      authService.redirectUrl = '/foo';
      expect(authService.getRedirectUrl()).toEqual('/foo');
    });
  });

  describe('processSuccess', () => {
    it('should be a function', () => {
      expect(typeof authService.processSuccess).toEqual('function');
    });

    it('should call localStorage.setItem with its input', () => {
      spyOn(localStorage, 'setItem');
      let data = {token: 'foo'}
      authService.processSuccess(data);
      expect(localStorage.setItem).toHaveBeenCalledWith('id_token', 'foo');
    });
  });

  describe('processError', () => {
    it('should be a function', () => {
      expect(typeof authService.processError).toEqual('function');
    });

    it('should parse the JSON string in the error response and return an object with the error message', () => {
      let error = {
        _body: {
          error: 'foo'
        }
      }
      error._body = JSON.stringify(error._body);
      expect(typeof authService.processError(error)).toEqual('object');
      expect(authService.processError(error).error).toEqual('foo');
    });
  });
});
