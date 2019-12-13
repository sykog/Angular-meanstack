import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './admin/home/home.component';
import {ApiService} from "./services/api.service";
import {AddUserComponent} from './user/add-user/add-user.component';
import {UserListComponent} from './user/user-list/user-list.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AddUserFormComponent } from './shared/add-user-form/add-user-form.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { RegisterComponent } from './user/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddUserComponent,
    UserListComponent,
    EditUserComponent,
    AddUserFormComponent,
    UserHomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
