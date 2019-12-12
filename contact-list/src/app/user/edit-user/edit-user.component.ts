import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  formSubscription: Subscription;
  id;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.apiService.getUser(id).subscribe(user => {
      this.userForm = this.formBuilder.group({
        first_name: [user.first_name, [Validators.required]],
        last_name: [user.last_name, [Validators.required]],
        email: [user.email, [Validators.required, Validators.email]],
        password: [user.password],
        phone: [user.phone],
        role: [user.role, [Validators.required]]
      });
    });
  }

  ngOnDestroy() {
    if (this.formSubscription) this.formSubscription.unsubscribe();
  }

  updateUserForm() {
    let id = this.route.snapshot.paramMap.get('id');
    if (this.userForm.valid) {
      this.formSubscription = this.apiService.updateUser(id, this.userForm.value).subscribe(response => {
        this.router.navigate(['/admin-home']);
      });
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }
}
