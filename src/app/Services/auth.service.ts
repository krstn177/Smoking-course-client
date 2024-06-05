import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment.development';
import IRegisterUser from '../Models/RegisterUser.model';
import IUser from '../Models/User.model';
import IAuthInfo from '../Models/AuthInfo.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessToken: string | null = null;

  private userSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  public user$: Observable<IUser | null> = this.userSubject.asObservable();

  private userWatched : string[] | null = [];
  private userFavourites : string[] | null = [];
  
  headerDict = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.accessToken}`
  }

  requestOptions = {
    headers: new HttpHeaders(this.headerDict)
  }

  constructor(private http: HttpClient) {
    const {accessToken, watched, favourites} = this.getAuthInfoFromStorage();

    if(accessToken) this.setAccessToken(accessToken);
    if(watched) this.userWatched = watched.split(' ');
    if(favourites) this.userFavourites = favourites.split(' ');
    
    console.log(this.userSubject.value);
    console.log(this.userWatched);
    console.log(this.userFavourites);
    console.log(this.accessToken);
  }

  addWatchedVideo(videoId: string){
    if (!this.userWatched?.includes(videoId)) this.userWatched?.push(videoId);
  }

  getAuthInfoFromStorage() {
    return {
      accessToken: localStorage.getItem('accessToken'),
      watched: localStorage.getItem('watched'),
      favourites: localStorage.getItem('favourites')
    };
  }

  setAuthInfoInLocalStorage(accessToken: string, watched: string[] | undefined, favourites: string[] | undefined) {
    localStorage.setItem('accessToken', accessToken);
    this.setAccessToken(accessToken);

    if (watched) {
      localStorage.setItem('watched', watched.join(' '));
      this.userWatched = watched; 
    }

    if (favourites) {
      localStorage.setItem('favourites', favourites.join(' '));
      this.userFavourites = favourites;  
    }
  }

  removeAuthInfoStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('watched');
    localStorage.removeItem('favourites');
  }
  
  removeAuthInfo(): void {
    this.accessToken = null;
    this.userSubject.next(null);
    this.userWatched = null;
    this.userFavourites = null;
  }

  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
    this.setUserFromToken(accessToken);
  }

  private setUserFromToken(token: string): void {
    try {
      const userPayload = jwtDecode(token) as IUser;
      this.userSubject.next(userPayload);
    } catch (error) {
      this.userSubject.next(null);
      console.error('Invalid token:', error);
    }
  }
  
  getAccessToken(): string | null {
    return this.accessToken;
  }
  
  getUserInfo(): IUser | null {
    return this.userSubject.value;
  }
  
  getUserWatched(): Array<string> | null {
    return this.userWatched;
  }
  
  getUserFavourites(): Array<string> | null {
    return this.userFavourites;
  }

  toggleFavouriteVideo(videoId: string): void {
    if (this.userFavourites?.includes(videoId)) this.userFavourites?.filter(video => video !== videoId);
    else this.userFavourites?.push(videoId);
  } 

  headerReSetter() {
    const token = this.accessToken;
    this.headerDict = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    this.requestOptions = { 
      headers: new HttpHeaders(this.headerDict)
    }
  }

  login(payload: Object): Observable<IAuthInfo>{
    return this.http.post<IAuthInfo>(`${environment.apiUrl}/auth/login`, payload, { responseType: 'json' });
  }

  register(payload: IRegisterUser): Observable<IAuthInfo>{
    return this.http.post<IAuthInfo>(`${environment.apiUrl}/auth/register`, payload, { responseType: 'json' });
  }

  refreshAccessToken(){
    return this.http.post(`${environment.apiUrl}/auth/token`, {}, { withCredentials: true });
  }

  logout(){
    this.headerReSetter();

    this.accessToken = null;
    return this.http.get(`${environment.apiUrl}/auth/logout`, this.requestOptions);
  }
}