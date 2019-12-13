import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./admin/home/home.component";
import {AddUserComponent} from "./user/add-user/add-user.component";
import {EditUserComponent} from "./user/edit-user/edit-user.component";
import {RegisterComponent} from "./user/register/register.component";
import {UserHomeComponent} from "./user/user-home/user-home.component";
import {AdminGuardService} from "./services/admin-guard.service";
import {UserGuardService} from "./services/user-guard.service";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'admin-home', component: HomeComponent, canActivate: [AdminGuardService]},
  {path: 'user-home', component: UserHomeComponent, canActivate: [UserGuardService]},
  {path: 'add-user', component: AddUserComponent, canActivate: [AdminGuardService]},
  {path: 'edit-user/:id', component: EditUserComponent, canActivate: [AdminGuardService]},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
