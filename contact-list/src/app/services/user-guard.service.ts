import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (window.sessionStorage.getItem('userId')) return true;
    this.router.navigate(["/"]);
    return false;
  }
}
