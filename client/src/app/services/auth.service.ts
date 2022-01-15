import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // server domain
  domain = "http://localhost:8080";

  authToken;
  user;
  options;

  constructor(private _http: HttpClient) {


  }

  loadToken(){
    this.authToken = localStorage.getItem('token')
  }

  createAuthenticationHeaders(){
    this.loadToken();
    // options variable should be created
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    }
  }

  getProfile(): Observable<any>{
    this.createAuthenticationHeaders();
    return this._http.get(this.domain + '/authentication/profile', this.options);
  }

  registerUser(user:any): Observable<any> {
    return this._http.post(this.domain + '/authentication/register', user);
  }

  login(user:any): Observable<any> {
    return this._http.post(this.domain + '/authentication/login',user);
  }

  storeUserData(token,user){
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

}
