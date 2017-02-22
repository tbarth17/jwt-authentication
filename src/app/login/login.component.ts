import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

interface Credentials {
    email: string,
    password: string
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    credentials: Credentials;

    invalid_credentials:boolean;

    constructor (private authService: AuthService, private router: Router) {}

    ngOnInit () {
        this.invalid_credentials = false;
        this.credentials = {
            email: '',
            password: ''
        };
    }

    login (form) {
        if (!form.valid) { return false; }
        this.authService.login(this.credentials, this.processSuccess.bind(this), this.processError.bind(this));
    }

    processSuccess () {
        let url = this.authService.getRedirectUrl();
        if (!!url && url !== '') {
            this.router.navigate([url]);
        } else {
            this.router.navigate(['/overview']);
        }
    }

    processError (error) {
        if (typeof error === 'object' && error.hasOwnProperty('error') && error.error === 'invalid_credentials') {
            this.invalid_credentials = true;
        }
    }
}
