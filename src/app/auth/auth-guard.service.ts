import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private routerState: RouterStateSnapshot) {}

  canActivate() {
    if(this.authService.loggedIn()) {
      return true;
    } else {
      this.authService.setUrl(this.routerState.url);
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
