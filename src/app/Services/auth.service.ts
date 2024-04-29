import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  token = this.getToken();
  headerDict = {
    'Content-Type': 'application/json',
    'X-Authorization': this.token
  }

  requestOptions = {
    headers: new HttpHeaders(this.headerDict)
  }

  headerReSetter() {
    this.token = this.getToken();
    this.headerDict = {
      'Content-Type': 'application/json',
      'X-Authorization': this.token
    }
    this.requestOptions = { 
      headers: new HttpHeaders(this.headerDict)
    }
  }

  getToken(){
  const token = localStorage.getItem('accessToken');
    if (token) {
      return token;
    } else{
        return '';
    }
  }

  getRole(){
    const role = localStorage.getItem('role');
      if (role) {
        return role;
      } else{
          return '';
      }
  }

  getHasOrdered(){
    return localStorage.getItem('hasOrdered');
  }

  adminPass(): Observable<boolean> {
    this.headerReSetter();
    
    return this.http.get(`${environment.apiUrl}/auth/admin-pass`, { ...this.requestOptions, responseType: 'text' }).pipe(
      map((res: any) => {
        return true;
      }),
      catchError((err: any) => {
        return of(false);
      })
    );
  }

  activatedPass(): Observable<boolean> {
    this.headerReSetter();
    
    return this.http.get(`${environment.apiUrl}/auth/activated-pass`, { ...this.requestOptions, responseType: 'text' }).pipe(
      map((res: any) => {
        return true;
      }),
      catchError((err: any) => {
        return of(false);
      })
    );
  }
  
  userPass(): Observable<boolean> {
    this.headerReSetter();
    
    return this.http.get(`${environment.apiUrl}/auth/user-pass`, { ...this.requestOptions, responseType: 'text' }).pipe(
      map((res: any) => {
        return true;
      }),
      catchError((err: any) => {
        return of(false);
      })
    );
  }

  irregularUserPass(): Observable<boolean> {
    this.headerReSetter();
    
    return this.http.get(`${environment.apiUrl}/auth/irregular-user-pass`, { ...this.requestOptions, responseType: 'text' }).pipe(
      map((res: any) => {
        return true;
      }),
      catchError((err: any) => {
        return of(false);
      })
    );
  }

  async setToken(token: string) {
    const userInfo = JSON.parse(token);
    localStorage.setItem('accessToken', userInfo.accessToken);
    localStorage.setItem('role', userInfo.role);
    localStorage.setItem('hasOrdered', userInfo.hasOrdered);
    localStorage.setItem('watched', userInfo.watched);
    localStorage.setItem('favourites', userInfo.favourites);
  }

  removeToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    localStorage.removeItem('hasOrdered');
    localStorage.removeItem('watched');
    localStorage.removeItem('favourites');
  }

  isLoggedIn() {
    return localStorage.hasOwnProperty('accessToken');
  }

  login(payload: Object){
    return this.http.post(`${environment.apiUrl}/auth/login`, payload, {responseType: 'text'});
  }

  register(payload: Object){
    return this.http.post(`${environment.apiUrl}/auth/register`, payload, {responseType: 'text'});
  }

  logout(){
    this.headerReSetter();

    this.removeToken();
    return this.http.get(`${environment.apiUrl}/auth/logout`, this.requestOptions);
  }
}