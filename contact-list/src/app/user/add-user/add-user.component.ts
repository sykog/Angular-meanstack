import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm : FormGroup;
  formSubscription: Subscription;

  constructor(private formBuilder : FormBuilder, private router : Router,
              private apiService : ApiService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      phone: [''],
      role: ['User', [Validators.required]]
    })
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }

  submitUserForm() {
    if (this.userForm.valid) {
      this.formSubscription = this.apiService.addUser(this.userForm.value).subscribe(response => {
          this.router.navigate(['/admin-home']);
      })
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }
}
