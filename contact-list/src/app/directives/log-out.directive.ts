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
    window.sessionStorage.removeItem('user');
    window.sessionStorage.removeItem('admin');
    this.router.navigate(['/']);
  }
}
