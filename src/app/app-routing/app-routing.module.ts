import { NgModule } from '@angular/core';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { OverviewComponent } from '../overview/overview.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthService } from '../auth/auth.service';
import { AuthApiService } from '../auth/auth-api.service';
import { AuthGuardService } from '../auth/auth-guard.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'Authorization',
        tokenGetter: (() => localStorage.getItem('id_token')),
        globalHeaders: [{'Content-Type':'application/json'}],
    }), http, options);
}

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        canActivate: [AuthGuardService]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthService,
        AuthGuardService,
        AuthApiService,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        }
    ]
})
export class AppRoutingModule { }
