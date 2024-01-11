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
    'Authorization': this.token
  }

  requestOptions = {
    headers: new HttpHeaders(this.headerDict)
  }

  headerReSetter() {
    this.token = this.getToken();
    this.headerDict = {
      'Content-Type': 'application/json',
      'Authorization': this.token
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

  async setToken(token: string) {
    const userInfo = JSON.parse(token);
    localStorage.setItem('accessToken', userInfo.token);
    localStorage.setItem('role', userInfo.role);
  }

  removeToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
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

  registerAdmin(payload: Object){
    this.headerReSetter();
    return this.http.post(`${environment.apiUrl}/auth/register-admin`, payload, {...this.requestOptions, responseType: 'text'});
  }

  logout(){
    this.http.get<any>(`${environment.apiUrl}/auth/logout`, this.requestOptions);
    this.removeToken();
  }
}