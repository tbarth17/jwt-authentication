import { Injectable } from '@angular/core';

@Injectable()
export class AuthApiMockService {

    constructor() {}

    public login (input) {
      return false;
    }


}
