import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import {io} from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl
  private socket = io('http://localhost:3000');

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Replace with your actual authorization token
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
  }

  addContact(data: any): Observable<any> {
    const url = `${this.apiUrl}/chats/saveContact`;
    return this.http.post(url, data, { headers: this.getHeaders() });
  }

  updateContact(contactId: any,data: any): Observable<any> {
    const url = `${this.apiUrl}/chats/updateContact${contactId}`;
    return this.http.post(url, data, { headers: this.getHeaders() });
  }

  getContacts(searchText: any=''): Observable<any> {
    const url = `${this.apiUrl}/chats/getContacts`;
    return this.http.get(url, { headers: this.getHeaders(), params:{searchText} });
  }

  sendMessage(data: any): Observable<any> {
    const url = `${this.apiUrl}/chats/sendMessage`;
    return this.http.post(url, data , {headers: this.getHeaders()})
  }

  getAllMessage(data: any): Observable<any> {
    const url = `${this.apiUrl}/chats/getMessages`;
    return this.http.post(url, data , {headers: this.getHeaders()})
  }

  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  socketListen(instanceSelected: any){
    // this.socket.on(instanceSelected) 
    console.log('instanceSelected', instanceSelected)
    this.socket.on(instanceSelected, (message: any) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
  
}
