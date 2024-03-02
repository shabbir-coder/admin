import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit, OnChanges {

  @Input() selectedContact: any
  @Input() selectedInstance: any

  ContactData: any ={}

  constructor(private chatService: ChatService){}

  messages: any = [
    {
      "sender": "me",
      "text": "Senders Message",
      "response": false,
      "createdAt": new Date()
    },
    {
      "sender": "them",
      "text": "recievers Message",
      "response": false,
      "createdAt": new Date()
    },
    
  ]
  

  ngOnInit(): void {
      
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.ContactData = changes['selectedContact']?.currentValue
      if(this.ContactData !== changes['selectedContact']?.previousValue){
        this.getAllMessages()
      }

      this.subscribeToMessages(this.selectedInstance)
  }

  // conversationId, senderId , recieverNumber, type , text, instance_id 
  messageText: FormControl = new FormControl('');
  sendMessage() {
    if(!this.messageText.value) return
    const data ={
      recieverId: this.ContactData?._id, 
      recieverNumber: this.ContactData?.number, 
      type : 'text', 
      text: this.messageText.value , 
      instance_id: this.selectedInstance
    }
    this.chatService.sendMessage(data).subscribe(
      (res: any)=>{
        this.appendMessageList(res)
        this.messageText.reset()
      }
    )
  }

  getAllMessages(){
    this.chatService.getAllMessage({recieverId: this.ContactData?._id}).subscribe(
      (res)=>{
        this.messages = res
      },err=>{
        this.messages = [];
      }
    )
  }

  appendMessageList(msgObj: any){
    this.messages.push(msgObj)
  }

  subscribeToMessages(instanceId: any){
    this.chatService.socketListen(instanceId).pipe().subscribe((message: string) => {
      console.log(message)
      this.messages.push(message);
    })
  }
}
