import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import IVideo from '../Models/Video.model';
import { AuthService } from './auth.service';
import IVideoCreate from '../Models/VideoCreate.model';
import IVideoSlim from '../Models/VideoSlim.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  
  constructor(private http: HttpClient, private auth: AuthService) {}
  token = this.auth.getAccessToken();
  headerDict = { }

  requestOptions = { }

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

  getList(){
    this.headerSetter();
    return this.http.get<IVideoSlim[]>(`${environment.apiUrl}/videos/all`, this.requestOptions);
  }

  getVideoInfo(id: string){
    this.headerSetter();
    return this.http.get<IVideo>(`${environment.apiUrl}/videos/${id}`, {...this.requestOptions, responseType: 'json'});
  }

  createVideo(video: IVideoCreate){
    this.headerSetter();

    console.log(video);
    return this.http.post(`${environment.apiUrl}/videos/create`, video, {...this.requestOptions, responseType: 'text'});
  }
}
