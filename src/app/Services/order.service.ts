import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.development';
import IOrderDTO from '../Models/OrderDTO.model';
import IOrderCodeDTO from '../Models/OrderCodeDTO.model';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private auth: AuthService) { }
  token = this.auth.getToken();

  headerDict = { }

  requestOptions = { }

  headerSetter() {
    this.token = this.auth.getToken();
    this.headerDict = {
      'Content-Type': 'application/json',
      'Authorization': this.token
    }
    this.requestOptions = { 
      headers: new HttpHeaders(this.headerDict)
    }
  }

  hasOrderedPass(): Observable<boolean> {
    this.headerSetter();
    
    return this.http.get(`${environment.apiUrl}/Orders/has-ordered`, { ...this.requestOptions, responseType: 'text' }).pipe(
      map((res: any) => {
        return true;
      }),
      catchError((err: any) => {
        return of(false);
      })
    );
  } 

  canRedeemPass(): Observable<boolean> {
    this.headerSetter();
    
    return this.http.get(`${environment.apiUrl}/Orders/can-redeem`, { ...this.requestOptions, responseType: 'text' }).pipe(
      map((res: any) => {
        return true;
      }),
      catchError((err: any) => {
        return of(false);
      })
    );
  }

  getUserInfo(){
    this.headerSetter();

    return this.http.get(`${environment.apiUrl}/Orders/user`, {...this.requestOptions, responseType: 'json'});
  }

  makeOrder(order: IOrderDTO){
    this.headerSetter();

    return this.http.post(`${environment.apiUrl}/Orders/make-order`, order, {...this.requestOptions, responseType: 'text'});
  }

  redeemCode(code: IOrderCodeDTO){
    this.headerSetter();

    return this.http.post(`${environment.apiUrl}/Orders/redeem-code`, code, {...this.requestOptions, responseType: 'text'});
  }

  setHasOrdered() {
    localStorage.setItem('hasOrdered', 'true');
  }
}
