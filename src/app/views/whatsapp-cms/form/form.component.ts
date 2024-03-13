import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SetService } from '../service/set.service';
import { environment } from 'src/environment/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{

  instancesList = [
    {_id:'1',isdCode:'91',number:'8058909535', updatedAt: new Date(), status:'active',registeredSets:3},
    {_id:'2',isdCode:'91',number:'7878888875', updatedAt: new Date(), status:'active',registeredSets:5},
    {_id:'3',isdCode:'965',number:'45887886', updatedAt: new Date(), status:'pending',registeredSets:0},
    {_id:'4',isdCode:'92',number:'8858446589', updatedAt: new Date(), status:'active',registeredSets:1},
  ];


  messageTypesList = [
    { id:1, type:'Text'},
    { id:2, type:'Media'},
  ]
  title='Auto Reply Configuration'
  setForm!: FormGroup;
  setDataForm!: FormGroup;
  showMediaFields=false
  public visible = false;
  isKeywordValid = true;
  dateNow
  setId = '';
  constructor(
    private formBuilder: FormBuilder,
    private setService: SetService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ){
    const dateNow = new Date();
    this.dateNow = this.datePipe.transform(dateNow, 'yyyy-MM-dd HH:mm');
  }

  selectedFile: any;


  ngOnInit(): void {
    this.initializeForm();
    this.createDataSetFormGroup() 
   // Fetch set details if editing
   this.setId = this.route.snapshot.params['id'];
   if (this.setId) {
     this.setService.getSetById(this.setId).subscribe((set: any) => {
       this.fillForm(set);
      console.log(set)
     });
   }
  }

  
  initializeForm(): void {
    this.setForm = this.formBuilder.group({
      setName : ['', Validators.required],
      status : ['', Validators.required],
      ITSverificationMessage : ['', Validators.required],
      ITSverificationFailed : ['', Validators.required],
      NumberVerifiedMessage : ['', Validators.required],
      AcceptanceMessage : ['', Validators.required],
      RejectionMessage : ['', Validators.required],
      StartingTime : ['', Validators.required],
      EndingTime : ['', Validators.required],
      // instanceStatus: ['', Validators.required],
      // instances: [[],Validators.required],
      setData: [[],Validators.minLength(1)]
    });
  }

  createDataSetFormGroup() {
    this.setDataForm = this.formBuilder.group({
      keywords: [[],Validators.required],
      keywordTyped : [''],
      answer: this.formBuilder.group({
        message: [''],
        messageType: ['1', Validators.required],
        timeStamp: [''],
        mediaFile: '',
        // extraButton: [''],
      }),
    });

    this.setDataForm.get('answer.messageType')?.valueChanges.subscribe((messageType) => {
      this.showMediaFields = [2, 4, 6, 8].includes(+messageType);
      console.log(this.showMediaFields,messageType)
      const mediaFileControl = this.setDataForm.get('answer.mediaFile');
      // const extraButtonControl = this.setDataForm.get('answer.extraButton');

      if (this.showMediaFields) {
        mediaFileControl?.setValidators([Validators.required]);
        // extraButtonControl?.setValidators([Validators.required]);
      } else {
        mediaFileControl?.clearValidators();
        // extraButtonControl?.clearValidators();
      }
      mediaFileControl?.updateValueAndValidity();
      // extraButtonControl?.updateValueAndValidity();
    });

    this.setDataForm.get('keywordTyped')?.valueChanges.subscribe((value) => {
      if(value && this.setForm.get('setData')?.value?.length<1){
        this.checkKeyword()
      }
    });
  }

  fillForm(set: any){
    this.setForm.patchValue(
      {...set,
      StartingTime : this.datePipe.transform(new Date(set.StartingTime), 'yyyy-MM-dd HH:mm'),
      EndingTime : this.datePipe.transform(new Date(set.EndingTime), 'yyyy-MM-dd HH:mm')
      })
  }
    // Function to add keyword to the list
    addKeyword() {
      if(!this.isKeywordValid) return
      const keyword = this.setDataForm.get('keywordTyped')?.value;
      const keywords = this.setDataForm.get('keywords')?.value || []
      if (keyword && !keywords?.includes(keyword)) {

        keywords.push(keyword);
        this.setDataForm.patchValue({
          keywords:keywords
        })
        this.setDataForm.get('keywordTyped')?.setValue(''); // Clear the input after adding
      }
    }
  
    // Function to remove a keyword from the list
    removeKeyword(index: number) {
      const keywords = this.setDataForm.get('keywords')?.value 

      keywords.splice(index, 1);
      this.setDataForm.patchValue({
        keywords
      })
    }

  finalSubmit( status='active' ){
    console.log("setForm", this.setForm)
    this.setForm.patchValue({status})
    let obs
    if(this.setId){
      obs = this.setService.updateSet(this.setId, this.setForm.value)
    }else{
      obs = this.setService.addSet(this.setForm.value)
    }
    obs.subscribe(
      (res:any)=>{
        this.setForm.reset();
        this.setDataForm.reset();
        this.router.navigate(['./whatsapp-config'])
      },(err)=>{
        console.log(err)
      }
    )

  }

  timeValidator(formGroup: FormGroup) {
    const { startTime, endTime } = formGroup.value;
    return endTime > startTime ? null : { timeInvalid: true };
  }

  setDataFormSubmitted=false
  updateIndex = null
  addData(){
    this.setDataFormSubmitted=true
    if(this.setDataForm.invalid){
      return
    }
    const value = this.setForm.get('setData')?.value
    console.log('updateIndex', this.updateIndex)
    if(typeof this.updateIndex === 'number'){
      value[this.updateIndex]=this.setDataForm.value
    }else{
      value.push(this.setDataForm.value)
    }

    console.log(value)

    this.setForm.patchValue({setData:value})
    console.log(this.setForm.value)
    this.updateIndex=null
    this.handleLiveDemoChange(false)
  }

  deleteSetData(index:number){
    const setData = this.setForm.get('setData')?.value 

    setData.splice(index, 1);
    this.setForm.patchValue({
      setData
    })
  }

  toggleLiveDemo() {
    this.setDataForm.reset();
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  keywordValidMessage = '';
  checkKeyword(){
    const keyword = this.setDataForm.get('keywordTyped')?.value
    this.setService.checkKeyword({keyword}).subscribe((res: any)=>{
      if(!res.status){
        console.log('hhhh')
        this.isKeywordValid = false;
      }else{
        this.isKeywordValid = true;
      }
      this.keywordValidMessage = res.message;
    })
  }

  UpdateSetData(data: any, index:any){
    this.updateIndex=index
    this.setDataForm.patchValue({
      keywords: data.keywords,
      answer: data.answer
    });
    console.log('data', data);
    this.visible = !this.visible;
  }
  mediaFile : any

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('picture', this.selectedFile);
    this.setService.saveFile(formData).subscribe(
      (res: any)=> {
        this.mediaFile=environment.apiUrl.replace('api','')+res.filePath
        this.setDataForm.get('answer')!.get('mediaFile')!.patchValue(this.mediaFile);
      })
  }


}

export interface Set {
  setName: string;
  status: string;
  instanceStatus: string;
  instances: string[];
  setData: {
    keywords: string[];
    answer: {
      message: string;
      messageType: string;
      timeStamp: string;
      mediaFile: string,
      extraButton: any[],
    };
  }[];
}