import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import swal from 'sweetalert2'
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-instances-list',
  templateUrl: './instances-list.component.html',
  styleUrl: './instances-list.component.scss'
})
export class InstancesListComponent implements OnInit, OnChanges{
  @Input() instancesList: any
  @Output() instanceSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(    
    private cdr: ChangeDetectorRef,
    private apiService : ApiService
  ){}

  data:any
  ngOnInit(): void {
      this.data = this.instancesList
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes['instancesList'].currentValue
  }

  getBadgeColor(active: boolean) {
    let color = 'success'
    // if(status==='pending') color = 'warning'
    // if(status==='draft') color = 'info'
    // if(status==='rejected') color = 'danger'
    if(!active) color = 'danger'
    return color
  }

  selectInstance(value: any){
    this.instanceSelected.emit(value)
  }

  deleteItem(id: any) {
    swal.fire({
      title: 'Are you sure to delete this ?',
      icon: "question",
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    }).then((res)=>{
      if(res.isConfirmed){
        this.apiService.deleteInstance(id).subscribe(
          (res)=>{
            swal.fire({
              title: "Deleted!",
              text: "Your Instance has been deleted.",
              icon: "success",
              timer: 1500
            })
            this.apiService.refreshData$.next(null);
          }
        )
      }
    })
    // Implement your delete logic here
  }
}
