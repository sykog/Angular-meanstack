import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  userSubscription: Subscription;
  user;
  id;
  showEditForm: boolean = false;
  showEditPassword: boolean = false;

  constructor(private apiService : ApiService) {
    this.userSubscription = this.apiService.getUser(window.sessionStorage.getItem('userId'))
      .subscribe(user => {
        this.user = user;
    });
    this.id = window.sessionStorage.getItem('userId');
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
}
