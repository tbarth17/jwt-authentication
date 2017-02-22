/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthApiService } from './auth-api.service';
import { BaseRequestOptions, Response, ResponseOptions, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('AuthApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthApiService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions],
                },
            ]
        });
    });

    it('should exist', inject([AuthApiService], (service: AuthApiService) => {
        expect(service).toBeTruthy();
    }));

    describe('login', () => {
        it('should set the proper headers and params and return an observable that passes the response data', inject([AuthApiService, MockBackend], (service: AuthApiService, backend: MockBackend) => {
            let credentials = {
                email: 'thing',
                password: 'stuff'
            };

            let mockData = {
                foo: 'bar'
            };

            let response = new ResponseOptions({
                body: JSON.stringify(mockData)
            });

            const baseResponse = new Response(response);

            let headers;

            backend.connections.subscribe(
                (c: MockConnection) => {
                    headers = [];
                    c.request.headers.keys().forEach(function (item) {
                        let idx = 0;
                        let obj = {};
                        obj[item] = c.request.headers.get(c.request.headers.keys()[idx]);
                        headers.push(obj);
                        idx++;
                    });
                    c.mockRespond(baseResponse);
                }
            );

            service.login(credentials).subscribe( data => {
                expect(headers).toEqual([{"Content-Type": "application/x-www-form-urlencoded"}]);
                expect(data).toEqual(mockData);
            });
        }));
    } );

});
