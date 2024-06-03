import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.development';
import IOrderDTO from '../Models/OrderDTO.model';
import IOrderCodeDTO from '../Models/OrderCodeDTO.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  token = this.auth.getAccessToken();
  headerDict = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  }

  requestOptions = {
    headers: new HttpHeaders(this.headerDict)
  }
  
  constructor(private http: HttpClient, private auth: AuthService) { }

  headerSetter() {
    this.token = this.auth.getAccessToken();
    this.headerDict = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }
    this.requestOptions = { 
      headers: new HttpHeaders(this.headerDict)
    }
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
