/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, NG_VALIDATORS, Validator, AbstractControl, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth/auth.service';
import { AuthMockService } from '../mocks/auth/auth-mock.service';
import { RouterMockService } from '../mocks/router/router-mock.service';

describe('LoginComponent', () => {
    let comp:    LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;
    let authService;
    let router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent
            ],
            imports: [
                FormsModule
            ],
            providers:[
                {provide: AuthService, useClass: AuthMockService },
                {provide: Router, useClass: RouterMockService }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        comp = fixture.debugElement.componentInstance;
        // AuthService from the root injector
        authService = fixture.debugElement.injector.get(AuthService);
        router = fixture.debugElement.injector.get(Router);
    });

    it('should create', () => {
        expect(comp).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should have and init function', () => {
            expect(comp.ngOnInit).toBeTruthy();
            expect(typeof comp.ngOnInit).toEqual('function');
        });

        it('should set some defaults', () => {
            expect(comp.credentials).toBeUndefined();
            expect(comp.invalid_credentials).toBeUndefined();
            comp.ngOnInit();
            expect(comp.credentials).toEqual({ email: '', password: '' });
            expect(comp.invalid_credentials).toEqual(false);
        });
    });

    describe('login', () => {
        it('should have a login function', () => {
            expect(comp.login).toBeTruthy();
            expect(typeof comp.login).toEqual('function');
        });

        it('should return false if it is passed an invalid form object', () => {
            spyOn(authService, 'login');
            let form = {
                valid: false
            };
            expect(comp.login(form)).toEqual(false);
            expect(authService.login).not.toHaveBeenCalled();
        });

        it('should call the login method on the AuthService if it is passed a valid form object', () => {
            spyOn(authService, 'login');
            let form = {
                valid: true
            };
            comp.login(form);
            expect(authService.login).toHaveBeenCalled();
        });
    });

    describe('processSuccess', () => {
        it('should have a processSuccess function', () => {
            expect(comp.processSuccess).toBeTruthy();
            expect(typeof comp.processSuccess).toEqual('function');
        });

        it('should get the redirect url from the AuthService and call the router to the url redirect if the url is defined and not an empty string', () => {
            spyOn(authService, 'getRedirectUrl').and.returnValue('foo');
            spyOn(router, 'navigate');
            comp.processSuccess();
            expect(authService.getRedirectUrl).toHaveBeenCalled();
            expect(router.navigate).toHaveBeenCalledWith(['foo']);
        });

        it('should get the redirect url from the AuthService and call the router to redirect to /overview if passed an undefined value', () => {
            spyOn(authService, 'getRedirectUrl').and.returnValue(undefined);
            spyOn(router, 'navigate');
            comp.processSuccess();
            expect(authService.getRedirectUrl).toHaveBeenCalled();
            expect(router.navigate).toHaveBeenCalledWith(['/overview']);
        });

        it('should get the redirect url from the AuthService and call the router to redirect to /overview if passed an undefined value', () => {
            spyOn(authService, 'getRedirectUrl').and.returnValue(null);
            spyOn(router, 'navigate');
            comp.processSuccess();
            expect(authService.getRedirectUrl).toHaveBeenCalled();
            expect(router.navigate).toHaveBeenCalledWith(['/overview']);
        });

        it('should get the redirect url from the AuthService and call the router to redirect to /overview if passed and empty string', () => {
            spyOn(authService, 'getRedirectUrl').and.returnValue('');
            spyOn(router, 'navigate');
            comp.processSuccess();
            expect(authService.getRedirectUrl).toHaveBeenCalled();
            expect(router.navigate).toHaveBeenCalledWith(['/overview']);
        });
    });

    describe('processError', () => {
        it('should have a processError function', () => {
            expect(comp.processError).toBeTruthy();
            expect(typeof comp.processError).toEqual('function');
        });

        it('should check the format of the error object and leave the default value of this.invalid_credentials as false if the error  message is not "invalid_credentials"', () => {
            comp.invalid_credentials = false;
            let error = {
                error: 'Not invalid_credentials'
            };
            comp.processError(error);
            expect(comp.invalid_credentials).toEqual(false);
        });

        it('should check the format of the error object and change the value of this.invalid_credentials to true if the error message is "invalid_credentials"', () => {
            comp.invalid_credentials = false;
            let error = {
                error: 'invalid_credentials'
            };
            comp.processError(error);
            expect(comp.invalid_credentials).toEqual(true);
        });
    });
});
