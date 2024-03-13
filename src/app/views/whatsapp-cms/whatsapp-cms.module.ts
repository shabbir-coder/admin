import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CmsRoutingModule } from './cms-routing.module';
import {CmsHomeComponent} from './cms-home/cms-home.component';
import { BadgeModule, ButtonModule, CardModule, FormModule, GridModule, ModalModule, TableModule, TooltipModule, UtilitiesModule } from '@coreui/angular';
import {FormComponent} from './form/form.component';
import {PreviewComponent} from './preview/preview.component';
import { IconModule } from '@coreui/icons-angular';
import {NgxPaginationModule} from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LineBreaksPipe } from './service/lineBreak.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    CmsHomeComponent,
    FormComponent,
    PreviewComponent,
    LineBreaksPipe
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
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
    SweetAlert2Module.forRoot()
  ],
  providers:[DatePipe]
})
export class WhatsappCmsModule { }
