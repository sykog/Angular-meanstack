import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {Router} from "@angular/router";

@Directive({
  selector: '[appLogOut]'
})
export class LogOutDirective {

  constructor(private router: Router) {
  }

  @HostListener("click", ["$event"]) onClick($event) {
    $event.stopPropagation();
    window.sessionStorage.removeItem('userId');
    window.sessionStorage.removeItem('adminId');
    this.router.navigate(['/']);
  }
}
