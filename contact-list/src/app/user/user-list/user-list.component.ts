import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any = [];
  getSubscription: Subscription;
  deleteSubscription: Subscription;
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number;

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.getUserSubscription();
    console.log(this.users);
  }

  private getUserSubscription = () => {
    this.getSubscription = this.apiService.getUsers().subscribe(users => {
      this.users = users;
      this.collectionSize = this.users.length;
    });
  }

  ngOnDestroy() {
    if (this.getSubscription) this.getSubscription.unsubscribe();
    if (this.deleteSubscription) this.deleteSubscription.unsubscribe();
  }

  deleteStudent(user) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.deleteSubscription = this.apiService.deleteUser(user._id).subscribe(response => {
        this.getUserSubscription();
      });
    }
  }

  get usersPagination() {
    return this.users.map((user, i) => ({
      id: i + 1, ...user
    })).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
