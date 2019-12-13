import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from "../services/api.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  getSubcription: Subscription;
  users: any = [];
  admins: any = [];
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getAdminsAndUsers();
  }

  private getAdminsAndUsers = () => {
    this.getSubcription = this.apiService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.getSubcription = this.apiService.getAdmins().subscribe(admins => {
      this.admins = admins;
    });
  }

  ngOnDestroy() {
    this.getSubcription.unsubscribe();
  }

  submitLoginForm(loginData) {
    if (this.loginForm.valid) {
      let user = this.admins.filter(admin => {
        if (this.loginForm.value.email == admin.email && this.loginForm.value.password == admin.password) {
          window.sessionStorage.setItem('adminId', admin.id);
          this.router.navigate(['/admin-home']);
        }
      })
      this.users.filter(user => {
        if (this.loginForm.value.email == user.email && this.loginForm.value.password == user.password) {
          window.sessionStorage.setItem('userId', user._id);
          this.router.navigate(['/user-home']);
        }
      })
      this.errorMessage = "Incorrect username or password";
    }
    this.loginForm.reset();
  }
}
