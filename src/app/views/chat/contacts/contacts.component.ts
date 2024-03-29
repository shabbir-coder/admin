import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {ChatService} from '../chat.service'
import { BehaviorSubject, debounceTime, switchMap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { cilCheck , cilWarning} from '@coreui/icons';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit{
  
  constructor(private chatService: ChatService, private fb:FormBuilder){}
  @Output() contactChange = new EventEmitter
  @Output() instanceSelected = new EventEmitter
  @Input() instancesList : any
  form !: FormGroup;
  selectedContact : any
  contactsList: any[] = []
  public visible = false;
  searchControl: FormControl = new FormControl('');
  selectedInstance: FormControl = new FormControl('');
  refreshData$= new BehaviorSubject(null)

  itemSize = 10;
  totalItems = 10;
  errorMessage=''
  icons = { cilCheck, cilWarning };

  pageParams={
    page: 1,
    limit: 10
  }
  ngOnInit(): void {
      this.form = this.fb.group({
        name:['', Validators.required],
        ITS:['', Validators.required],
        number:['', Validators.required]
      })
      this.getAllContacts()
      this.searchControl.valueChanges.pipe(
        debounceTime(1000)
      ).subscribe(newValue => {
        this.getAllContacts(newValue); 
      });

      this.selectedInstance.valueChanges.pipe(
        debounceTime(1000)
      ).subscribe(newValue => {
        this.selectContact(newValue)
        this.instanceSelected.emit(newValue); 
      });
  }

  toggleLiveDemo() {
    this.form.reset()
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  submitForm(){
    if(this.form.invalid) return;
    this.chatService.addContact(this.form.value).subscribe(
      (res)=>{
        this.form.reset()
        this.errorMessage = ''
        this.handleLiveDemoChange(false)
        this.getAllContacts()
      },err=>{
        this.errorMessage = err.error.error
      }
    )
  }

  getAllContacts(searchtext=''){
      this.refreshData$.pipe(
        switchMap(() => this.chatService.getContacts({searchtext,...this.pageParams}))
      ).subscribe((res: any) => {
        // console.log(res);
        this.contactsList = res.data;
        this.totalItems = res.total;
      });
  }

  getAvatar(name: any){
    return name ? name[0].toUpperCase() : '';
  }

  selectContact(contact: any){
    this.selectedContact = contact?._id
    this.contactChange.emit(contact)
  }

  pageChange(event: any){
    this.pageParams.page = event;
    this.refreshData$.next(null);
  }
}
