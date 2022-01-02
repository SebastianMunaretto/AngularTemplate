import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // server domain
  domain = "http://localhost:8080"

  constructor(private _http: HttpClient) {


  }

  registerUser(user:any): Observable<any> {
    return this._http.post(this.domain + '/authentication/register', user);
  }

}
