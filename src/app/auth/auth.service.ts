import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

import { AuthApiService } from './auth-api.service';

@Injectable()
export class AuthService {

    private redirectUrl: string = '';

    constructor(private authApiService: AuthApiService) {}

    // public methods
    login (credentials, successCallback, errorCallback) {
        this.authApiService.login(credentials)
        .subscribe(
            data => {
                this.processSuccess(data);
                successCallback(data);
            },
            error => {
                errorCallback(this.processError(error));
            }
        );
    }

    public loggedIn () {
        return tokenNotExpired();
    }

    public logOut () {
        localStorage.removeItem('id_token');
    }

    public setUrl (url) {
        this.redirectUrl = url;
    }

    public getRedirectUrl () {
        return this.redirectUrl;
    }

    // private methods
    private processSuccess (data) {
        localStorage.setItem('id_token', data.token);
    }

    private processError (error) {
        return JSON.parse(error._body);
    }

}
