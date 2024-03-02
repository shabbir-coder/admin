import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../home/service/api.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent implements OnInit{

  constructor( private apiService: ApiService){}
  selectedContact: any;
  selectedInstance: any;
  instancesList :any []= []

  ngOnInit(): void {
    this.fetchAllData()
  }

  contactChange(event: any){
    this.selectedContact = event;
  }

  instanceSelected(event: any){
    this.selectedInstance = event
  }

  fetchAllData(){
    this.apiService.getListing().subscribe(
      (res: any)=>{
        // this.instancesList = res.data
        this.instancesList = [...res.data]
      }
    )
  }
}
