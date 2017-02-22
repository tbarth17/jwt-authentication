/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';

import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { AuthMockService } from './mocks/auth/auth-mock.service';

describe('AppComponent', () => {

    let comp:    AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;
    let authService;

    // async beforeEach
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers:[
                {provide: AuthService, useClass: AuthMockService }
            ]
        });
        TestBed.compileComponents();
    }));

    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.debugElement.componentInstance;
        // AuthService from the root injector
        authService = fixture.debugElement.injector.get(AuthService);
    });

    describe('1st tests', () => {
        it('true is true', () => expect(true).toBe(true));
    });

    it('should create the app', async(() => {
        expect(comp).toBeTruthy();
    }));

    describe('logOut function', () => {
        it(`should have a logOut function`, async(() => {
            expect(typeof comp.logOut).toEqual('function');
        }));

        it(`should call the auth service`, async(() => {
            spyOn(authService, 'logOut');
            expect(authService.logOut).not.toHaveBeenCalled();
            comp.logOut();
            expect(authService.logOut).toHaveBeenCalled();
        }));
    });

    // it('should render title in a h1 tag', async(() => {
    //   const fixture = TestBed.createComponent(AppComponent);
    //   fixture.detectChanges();
    //   const compiled = fixture.debugElement.nativeElement;
    //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
    // }));
});
