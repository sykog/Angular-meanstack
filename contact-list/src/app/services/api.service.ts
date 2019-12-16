import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {User} from "../shared/user";
import {Admin} from "../shared/admin";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  addUser(user: User) : Observable<any> {
    let url = this.endpoint + "/add-user";
    return this.http.post(url, user).pipe(catchError(this.manageError));
  }

  getUsers() {
    return this.http.get(this.endpoint);
  }

  getUser(id) : Observable<any> {
    let url = this.endpoint + "/read-user/" + id;

    return this.http.get(url, {headers: this.headers}).pipe(
      map((response: Response) => {
        // returns response if not null or undefined
        return response || {};
      }),catchError(this.manageError)
    );
  }

  updateUser(id, user: User) : Observable<any> {
    let url = this.endpoint + "/update-user/" + id;

    return this.http.put(url, user, {headers: this.headers}).pipe(
      catchError(this.manageError)
    );
  }

  deleteUser(id) : Observable<any> {
    let url = this.endpoint + "/delete-user/" + id;

    return this.http.delete(url).pipe(catchError(this.manageError));
  }

  addAdmin(admin: Admin): Observable<any> {
    let url = this.endpoint + "/add-admin";
    return this.http.post(url, admin).pipe(catchError(this.manageError));
  }

  updateAdmin(id, admin: Admin): Observable<any> {
    let url = this.endpoint + "/update-admin/" + id;

    return this.http.put(url, admin, {headers: this.headers}).pipe(
      catchError(this.manageError)
    );
  }

  getAdmins() {
    return this.http.get(this.endpoint + "/admin");
  }

  private manageError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) errorMessage = error.error.message;
    else errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
