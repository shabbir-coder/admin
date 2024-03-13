import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';
import {io} from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  instanceCreated = new BehaviorSubject<any>(null);
  refreshData$ = new BehaviorSubject<any>(null);

  private apiUrl = environment.apiUrl
  private socket = io('http://5.189.156.200:82/nodejs');

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Replace with your actual authorization token
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
  }


  createInstance(){
    return this.http.get('https://login.come-back.co/api/create_instance?access_token=649bebf664a20')
  }

  createInstanceV2(){
    const url = `${this.apiUrl}/instance`;
    return this.http.get( url, { headers: this.getHeaders() });
  }

  
  setWebhook(instanceId: any){
    const url = `${this.apiUrl}/instance/setWebHook/${instanceId}`;
    return this.http.get( url, { headers: this.getHeaders() });
  }


  getQrCode(instanceId: any){
    return this.http.get(`https://login.come-back.co/api/get_qrcode?instance_id=${instanceId}&access_token=649bebf664a20`);
  }

  
  getQrCodeV2(instanceId: any){
    const url = `${this.apiUrl}/instance/getQr/${instanceId}`;
    return this.http.get( url, { headers: this.getHeaders() });
  }

  getListing(){
    const url = `${this.apiUrl}/instance/list`;
    return this.http.get( url, { headers: this.getHeaders() });
  }

  saveInstance(data: any){
    const url = `${this.apiUrl}/instance/save`;
    return this.http.post( url, data, { headers: this.getHeaders() });
  }

  updateInstance(instanceId: any, data: any){
    const url = `${this.apiUrl}/instance/update/${instanceId}`;
    return this.http.post( url, data, { headers: this.getHeaders() });
  }

  deleteInstance(instanceId: any){
    const url = `${this.apiUrl}/instance/${instanceId}`;
    return this.http.delete( url, { headers: this.getHeaders() });
  }

  downloadReport(instanceId: any ,range?: any){
    console.log(instanceId, range)
    const url = `${this.apiUrl}/chats/getreport/${instanceId}`;
    return this.http.get<Blob>( url, { params:range, responseType: 'blob' as 'json'  });
  }

}
