import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./admin/home/home.component";
import {AddUserComponent} from "./user/add-user/add-user.component";
import {EditUserComponent} from "./user/edit-user/edit-user.component";
import {RegisterComponent} from "./user/register/register.component";
import {UserHomeComponent} from "./user/user-home/user-home.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'admin-home', component: HomeComponent},
  {path: 'user-home', component: UserHomeComponent},
  {path: 'add-user', component: AddUserComponent},
  {path: 'edit-user/:id', component: EditUserComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
