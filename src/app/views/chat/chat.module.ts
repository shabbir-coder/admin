import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ContainerComponent } from './container/container.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MessagesComponent } from './messages/messages.component';
import { AlertModule, BadgeModule, ButtonModule, CardModule, FormModule, GridModule, ModalModule, TableModule, TooltipModule, UtilitiesModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [
    ContainerComponent,
    ContactsComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    CardModule, 
    GridModule,
    BadgeModule,
    TableModule,
    IconModule,
    ButtonModule,
    UtilitiesModule,
    TooltipModule,
    NgxPaginationModule,
    FormModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule,
    AlertModule,
    SweetAlert2Module.forRoot()
  ]
})
export class ChatModule { }
