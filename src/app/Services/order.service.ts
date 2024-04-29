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
      'X-Authorization': this.token
    }
    this.requestOptions = { 
      headers: new HttpHeaders(this.headerDict)
    }
  }

  hasOrderedPass(): Observable<boolean> {
    this.headerSetter();
    
    return this.http.get(`${environment.apiUrl}/orders/has-ordered`, { ...this.requestOptions }).pipe(
      map((res: any) => {
        return true;
      }),
      catchError((err: any) => {
        return of(false);
      })
    );
  } 

  setHasOrdered(){
    localStorage.setItem('hasOrdered', 'true');
  }

  setActivatedRole(){
    localStorage.setItem('role', 'acrivated');
  }

  getUserInfo(){
    this.headerSetter();

    return this.http.get(`${environment.apiUrl}/auth/user-info`, {...this.requestOptions, responseType: 'json'});
  }

  makeOrder(order: IOrderDTO){
    this.headerSetter();

    return this.http.post(`${environment.apiUrl}/orders/create`, order, {...this.requestOptions });
  }

  redeemCode(code: IOrderCodeDTO){
    this.headerSetter();

    return this.http.post(`${environment.apiUrl}/orders/activate`, code, {...this.requestOptions });
  }

}
