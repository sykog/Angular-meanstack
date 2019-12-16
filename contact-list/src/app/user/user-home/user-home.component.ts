import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SHA1} from "crypto-js";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  userSubscription: Subscription;
  passwordSubscription: Subscription;
  user;
  id;
  showEditForm: boolean = false;
  showEditPassword: boolean = false;
  passwordForm: FormGroup;
  passwordError: boolean = false;

  constructor(private apiService : ApiService, private formBuilder: FormBuilder) {
    this.userSubscription = this.apiService.getUser(window.sessionStorage.getItem('userId'))
      .subscribe(user => this.user = user);
    this.id = window.sessionStorage.getItem('userId');
  }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]]
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.passwordSubscription) this.passwordSubscription.unsubscribe();
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      if (this.passwordForm.value.password == this.passwordForm.value.confirm) {
        this.user = {...this.user,
          password: SHA1(this.passwordForm.value.password).toString()
        }

        this.passwordSubscription = this.apiService.updateUser(this.id, this.user).subscribe(response => {
          location.reload();
        });
      } else {
        this.passwordError = true;
      }
    }
  }
}
