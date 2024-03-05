import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../service/api.service' 
import { debounce, debounceTime, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  title='Dashboard'
  greeting: string;
  QRCode: any;
  form!: FormGroup;
  onlyQr = false;

  instancesList : any;
	today = inject(NgbCalendar).getToday();

  constructor(
    private apiService: ApiService ,
    private fb: FormBuilder
  ){
    this.setGreeting();
  }

  selectedInstance:any
  selectedSet:any

  setsList = [
    { _id:'1' , setName: 'Set A',status:'approved', used:5, createdAt: new Date(), updatedAt: new Date() },
    { _id:'2' , setName: 'Set B',status:'pending', used:8,createdAt: new Date(), updatedAt: new Date() },
    { _id:'3' , setName: 'Set C',status:'draft', used:10, createdAt: new Date(), updatedAt: new Date() },
    { _id:'4' , setName: 'Set D',status:'approved', used:15, createdAt: new Date(), updatedAt: new Date() },
    { _id:'5' , setName: 'Set E',status:'approved', used:10, createdAt: new Date(), updatedAt: new Date() },
    { _id:'6' , setName: 'Set F',status:'draft', used:7, createdAt: new Date(), updatedAt: new Date() },
    { _id:'7' , setName: 'Set G',status:'rejected', used:2, createdAt: new Date(), updatedAt: new Date() },
  ];


  ngOnInit(): void {
      this.form = this.fb.group({
        name: ['', Validators.required],
        number: ['', Validators.required],
        instance_id: ['']
      })
      this.fetchAllData()
  }

  setGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      this.greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      this.greeting = 'Good afternoon';
    } else {
      this.greeting = 'Good evening';
    }
  }

  public visible = false;
  newInstanceId = '';
  openModal(type?: any) {
    if(type==='new'){
      this.apiService.createInstanceV2().subscribe(
        (res: any)=>{
          console.log(res)
          this.newInstanceId = res?.instance_id
          this.form.patchValue({instance_id: this.newInstanceId})
          this.QRCode = res?.data?.base64
          // this.setWebhook(this.newInstanceId)
          this.visible = !this.visible;
        }
      )
    }
  }

  setWebhook(){
    if(!this.newInstanceId) return
    this.apiService.setWebhook(this.newInstanceId).pipe(debounceTime(400)).subscribe()
  }


  handleLiveDemoChange(event: any) {
    // this.setWebhook()
    this.visible = event;
  }

  instanceSelected(event: any){
    this.selectedInstance = event;
  }

  save(){
    let obs = this.apiService.saveInstance(this.form.value)
    // if(this.selectedInstance){
    //   obs = this.apiService.updateInstance(this.selectedInstance, this.form.value)
    // }

    obs.subscribe(
      (res: any)=>{
        this.handleLiveDemoChange(false)
        this.form.reset()
        this.fetchAllData()
      },err=>{
        console.log(err)
      }
    )
  }

  fetchAllData(){
    this.apiService.refreshData$.pipe(
      switchMap(() => this.apiService.getListing())
    ).subscribe(
      (res: any)=>{
        this.instancesList = res.data
      }
    )
    
  }

  getQrOnly(instanceId: any){
    // this.onlyQr = true;
    this.apiService.getQrCodeV2(instanceId).subscribe(
      (res: any)=>{

        this.QRCode = res?.data?.base64
        this.visible = !this.visible;
      }
    )
  }

  downloadReport(instanceId: any){
    this.apiService.downloadReport(instanceId).subscribe(
      (data: Blob) => {
        // Create a new blob object
        const blob = new Blob([data], { type: 'text/csv' });
        
        // Create a URL for the blob object
        const url = window.URL.createObjectURL(blob);

        // Create a new anchor element
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.csv'; // File name for download
        document.body.appendChild(a); // Append the anchor to the body
        a.click(); // Simulate click on the anchor
        window.URL.revokeObjectURL(url); // Clean up the URL object
        a.remove(); // Remove the anchor from the document
      },
      error => console.error('Error downloading the report:', error)
    );
  }

  


  // ============================ > Date Range logics

  calendar = inject(NgbCalendar);

	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate = this.calendar.getToday();
	toDate: NgbDate | null = this.calendar.getNext(this.fromDate, 'd', 10);

	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

  // ============================ > Date Range logics

}

 