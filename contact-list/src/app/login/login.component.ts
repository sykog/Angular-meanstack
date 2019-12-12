import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  submitLoginForm(loginData) {
    if (loginData.username != '' && loginData.password != '') {
      this.router.navigate(['/admin-home']);
      this.loginForm.reset();
    } else {
      window.alert("Username or password cannot be blank!");
    }
  }
}
