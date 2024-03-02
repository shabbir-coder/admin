import { Component } from '@angular/core';
import { SetService } from '../service/set.service';
import swal from 'sweetalert2'
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-cms-home',
  templateUrl: './cms-home.component.html',
  styleUrl: './cms-home.component.scss'
})
export class CmsHomeComponent {
  title='Whatsapp Configuration'
  itemSize = 10;
  tableData: TableData[] = [];
  refreshData$= new BehaviorSubject(null)

  constructor(
    private setService: SetService,
  ){

  }
  // constructor( public iconSet: IconSetService) {
  //   iconSet.icons = { cilNotes,cilTrash, cilPen };
  // }
  pageParams={
    page: 1,
    limit: 10
  }
  ngOnInit(): void {
    this.getData();
  }

  viewItem(item: TableData) {
    console.log('View item:', item);
    // Implement your view logic here
  }

  getData(){
    this.refreshData$.pipe(
      switchMap(() => this.setService.getSetsList(this.pageParams))
    ).subscribe((res: any) => {
      console.log(res);
      this.tableData = res.data;
    });
  }

  editItem(item: TableData) {
    console.log('Edit item:', item);
    // Implement your edit logic here
  }

  deleteItem(item: TableData) {
    swal.fire({
      title: 'Are you sure to delete this ?',
      icon: "question",
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    }).then((res)=>{
      if(res.isConfirmed){
        this.setService.deleteSet(item?._id).subscribe(
          (res)=>{
            swal.fire({
              title: "Deleted!",
              text: "Your Set has been deleted.",
              icon: "success",
              timer: 1500
            })
            this.refreshData$.next(null);
          }
        )
      }
    })
    // Implement your delete logic here
  }

  getBadgeColor(status: string) {
    let color = 'success'
    if(status==='pending') color = 'warning'
    if(status==='draft') color = 'info'
    if(status==='rejected') color = 'danger'
    return color
  }

  pageChange(event: any){
    this.pageParams.page = event;
    this.getData()
  }
}

interface TableData {
  _id: string;
  setName: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}