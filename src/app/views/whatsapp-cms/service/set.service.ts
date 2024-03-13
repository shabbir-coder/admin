import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import {io} from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SetService {

  constructor(private http: HttpClient) { }
  
  private apiUrl = environment.apiUrl
  private socket = io('http://5.189.156.200:82/nodejs');

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Replace with your actual authorization token
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
  }

  addSet(data: any): Observable<any> {
    const url = `${this.apiUrl}/sets`;
    return this.http.post(url, data, { headers: this.getHeaders() });
  }

  updateSet(id: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/sets/${id}`;
    return this.http.put(url, data, { headers: this.getHeaders() });
  }

  getSetById(id: string): Observable<any> {
    const url = `${this.apiUrl}/sets/${id}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  deleteSet(id: string): Observable<any> {
    const url = `${this.apiUrl}/sets/${id}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  updateSetStatus(id: string): Observable<any> {
    const url = `${this.apiUrl}/sets/${id}/update-status`;
    return this.http.patch(url, {}, { headers: this.getHeaders() });
  }

  getSetsList(params: any): Observable<any> {
    const url = `${this.apiUrl}/sets`;
    return this.http.get(url, { headers: this.getHeaders() , params });
  }

  getQrInstance(): Observable<any>{
    const url = `${this.apiUrl}/instance`;
    this.http.get(url, { headers: this.getHeaders() }).subscribe();  
    let observable = new Observable<any>(observer => {
      this.socket.on('qr', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };  
    });
    return observable;
  }

  checkKeyword(data: any){
    const url=`${this.apiUrl}/sets/validatekeywords`;
    return this.http.post(url, data, { headers: this.getHeaders() });
  }

  
  saveFile(formdata: any){
    const url=`${this.apiUrl}/chats/uploadPicture`;
    const token = localStorage.getItem('authToken'); // Replace with your actual authorization token
    const headers =new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.http.post(url, formdata, { headers});
  }

}

