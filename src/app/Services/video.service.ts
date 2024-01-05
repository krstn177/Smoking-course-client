import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import IVideo from '../Models/Video.model';
import { AuthService } from './auth.service';
import IVideoDTO from '../Models/VideoDTO.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  videos : IVideo[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {}
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

  headerSetterUpload(){
    this.token = this.auth.getToken();
    this.headerDict = {
      'Authorization': this.token
    }
    this.requestOptions = { 
      headers: new HttpHeaders(this.headerDict)
    }
  }

  headerSetterDownload(){
    this.headerDict = {
      'Content-Type': 'video/mp4',
      'Authorization': this.token
    }
    this.requestOptions = {
      headers: new HttpHeaders(this.headerDict),
    }
  }

  getList(){
    this.headerSetter();
    return this.http.get<IVideo[]>(`${environment.apiUrl}/Video/list`, this.requestOptions);
  }

  downloadVideo(fileName: string){
    this.headerSetterDownload();
    return this.http.get(`${environment.apiUrl}/Video/get-video/${fileName}`, {...this.requestOptions, responseType: 'blob'});
  } 

  getVideoInfo(id: string){
    this.headerSetter();
    return this.http.get<IVideo>(`${environment.apiUrl}/Video/${id}`, {...this.requestOptions, responseType: 'json'});
  }

  createVideo(video: IVideoDTO){
    this.headerSetterUpload();

    const formData: FormData = new FormData();
    formData.append('Title', video.Title);
    formData.append('Description', video.Description);
    formData.append('Video', video.Video, video.Video.name);
    formData.append('VideoScreenshot', video.VideoScreenshot, video.VideoScreenshot.name);

    console.log(formData);
    return this.http.post(`${environment.apiUrl}/Video/create`, formData, {...this.requestOptions, responseType: 'text'});
  }

}
