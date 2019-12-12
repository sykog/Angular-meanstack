import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./admin/home/home.component";
import {AddUserComponent} from "./user/add-user/add-user.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'admin-home', component: HomeComponent},
  {path: 'add-user', component: AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
