import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Login } from './login'

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      })
  };

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:8082/Login/doLogin';
  private logoutUrl = 'http://localhost:8082/Login/doLogout';
  private data: Login;

  constructor(
    private http: HttpClient
  ) { }

  loginS(loginData: Login): Observable<any> {
    return this.http.post<Login>(this.loginUrl, loginData, httpOptions).pipe(
      tap( xxxx => { 
        this.data = loginData;
        console.log('wel!');
      }),
      catchError(this.handleError<any>('login'))
    );
  }

  logout(loginData: Login): Observable<any> {
    return this.http.post<Login>(this.logoutUrl, loginData, httpOptions).pipe(
      tap( xxxx => console.log('bye')),
      catchError(this.handleError<any>('logout'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        //console.error(error);
        return of(result as T);
      };
  }

  public getData(): Login {
    return this.data;
  }

}
