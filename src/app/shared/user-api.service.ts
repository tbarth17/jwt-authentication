import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserApiService {

  constructor(private authHttp: AuthHttp) { }

  getUser () {
      return this.authHttp.get('http://api.app/index')
      .map(res => res.json())
  }

}
