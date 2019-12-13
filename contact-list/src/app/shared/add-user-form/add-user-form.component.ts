import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent implements OnInit {

  @Input() submitType: string;
  // ? is an optional paramter
  @Input() id?;
  userForm: FormGroup;
  formSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit() {
    if (this.submitType == 'update') {
      console.log(this.id);
      this.apiService.getUser(this.id).subscribe(user => {
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
      })
    }
  }

  ngOnDestroy() {
    if (this.formSubscription) this.formSubscription.unsubscribe();
  }

  submitUserForm() {
    if (this.userForm.valid) {
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
  }

  updateUserForm() {
    let id = this.route.snapshot.paramMap.get('id');
    this.formSubscription = this.apiService.updateUser(id, this.userForm.value).subscribe(response => {
      this.router.navigate(['/admin-home']);
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }
}
