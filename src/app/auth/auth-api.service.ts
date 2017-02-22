import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class AuthApiService {

  constructor(private http: Http) { }

  login (credentials) {
      // a bit goofy but we need a very specific format for the authentication to function properly
      // all other calls to the api will use the AuthHttp method from angular2-jwt
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers });
      let params: URLSearchParams = new URLSearchParams();
      params.set("email", credentials.email);
      params.set("password", credentials.password);

      return this.http.post('http://api.app/authenticate', params, options).map(res => res.json())
  }

}
