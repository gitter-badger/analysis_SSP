import { Injectable } from '@angular/core';
import { Http,
         Headers,
         Response,
         RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
// import { HttpService } from "../http.service";
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
  private token: string;
 
  constructor( private http: Http ) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(_username: string, _password: string): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3030/login', { username: _username, password: _password }, options)
      .map((response: Response) => {
      // login successful if there's a jwt token in the response
      // console.log('authentication service response:');
      let token = response.json() && response.json().token;
      // console.dir(response.json());
      if (token) {
      // set token property
        this.token = token;
        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify({ username: _username, token: token }));
        // console.dir(localStorage);
        // return true to indicate successful login
        return true;
      } else {
        // return false to indicate failed login
        return false;
        }
      });
    }

    logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
    }
}
