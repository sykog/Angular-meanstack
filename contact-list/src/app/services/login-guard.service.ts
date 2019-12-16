import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (window.sessionStorage.getItem('adminId')) {
      this.router.navigate(["/admin-home"]);
      return true;
    } else if (window.sessionStorage.getItem('userId')) {
      this.router.navigate(["/user-home"]);
      return true;
    }
    return true;
  }
}
