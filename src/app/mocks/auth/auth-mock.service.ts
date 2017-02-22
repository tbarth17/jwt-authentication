import { Injectable } from '@angular/core';

@Injectable()
export class AuthMockService {

    private redirectUrl: string = '';

    constructor() {}

    // public methods
    public login (credentials, successCallback, errorCallback) {
        successCallback();
        errorCallback();
        return true;
    }

    public loggedIn () {
        return true;
    }

    public logOut () {
        return true;
    }

    public setUrl (url) {
      return url;
    }

    public getRedirectUrl () {
        return true;
    }

}
