import { Component, OnInit } from '@angular/core';
import { SetService } from '../service/set.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent implements OnInit{

  title='Auto Reply Configuration'
  
  constructor(  private setService: SetService){}
  QRImage:any
  ngOnInit(): void {
    console.log('hit')
      // this.setService.getQrInstance().subscribe(
      //   (res)=>{
      //     console.log(res)

      //   },(err)=>{
      //     console.log(err)
      //   }
      // )
  }
}
