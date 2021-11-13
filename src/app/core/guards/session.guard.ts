import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  constructor(private CookieService: CookieService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkCookieSession();
  }

  checkCookieSession(): boolean {
    try {
      const token: boolean = this.CookieService.check('token');

      if (token) {
        return true;
      } else {
        this.router.navigate(['/', 'auth']);
        return false;
      }
    } catch (e) {
      console.log('Algo mal sucedio 😢😢😢');
      return false;
    }
  }
}
