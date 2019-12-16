import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {SHA1} from "crypto-js";

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent implements OnInit {

  @Input() submitType: string;
  // ? is an optional paramter
  @Input() id?;
  userForm;
  formSubscription: Subscription;
  getSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit() {
    if (this.submitType == 'update') {
      console.log(this.id);
      this.getSubscription = this.apiService.getUser(this.id).subscribe(user => {
        this.userForm = this.formBuilder.group({
          first_name: [user.first_name, [Validators.required]],
          last_name: [user.last_name, [Validators.required]],
          email: [user.email, [Validators.required, Validators.email]],
          password: [user.password],
          phone: [user.phone],
          role: [user.role, [Validators.required]]
        });
      });
    } else {
      this.userForm = this.formBuilder.group({
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [this.submitType == 'register' ? '' : 'password'],
        phone: [''],
        role: ['User', [Validators.required]]
      });
    }
  }

  ngOnDestroy() {
    if (this.formSubscription) this.formSubscription.unsubscribe();
    if (this.getSubscription) this.getSubscription.unsubscribe();
  }

  submitUserForm() {
    if (this.userForm.valid) {
      this.userForm.value = {...this.userForm.value,
        password: SHA1(this.userForm.value.password).toString()
      }
      switch (this.submitType) {
        case 'register' :
          this.registerUserForm();
          break;
        case 'update' :
          this.updateUserForm();
          break;
        default:
          this.addUserForm();
          break;
      }
    }
  }

  addUserForm() {
    this.formSubscription = this.apiService.addUser(this.userForm.value).subscribe(response => {
      this.router.navigate(['/admin-home']);
    });
  }

  registerUserForm() {
    this.formSubscription = this.apiService.addUser(this.userForm.value).subscribe(response => {
      this.router.navigate(['/user-home']);
    });

    /*const admin = {
      first_name: this.userForm.value.first_name,
      last_name: this.userForm.value.last_name,
      email: this.userForm.value.email,
      password: SHA1(this.userForm.value.password).toString()
    }
    this.formSubscription = this.apiService.updateAdmin("5df3b467fbfa67304820320d", admin).subscribe(response => {
      console.log(admin);
    });*/
  }

  updateUserForm() {
    let id = this.route.snapshot.paramMap.get('id');
    if (window.sessionStorage.getItem('userId')) id = window.sessionStorage.getItem('userId');
    this.formSubscription = this.apiService.updateUser(id, this.userForm.value).subscribe(response => {
      if (window.sessionStorage.getItem('userId')) {
        this.router.navigate(['/user-home']);
        location.reload();
      } else {
        this.router.navigate(['/admin-home']);
      }
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }
}
