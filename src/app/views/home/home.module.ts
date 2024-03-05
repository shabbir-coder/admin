import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BadgeModule, ButtonModule, CardModule, FormModule, GridModule, ModalModule, SpinnerModule, TableModule, TooltipModule, UtilitiesModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { InstancesListComponent } from './instances-list/instances-list.component';
import { ChartsComponent } from './charts/charts.component';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DomsanitizationPipe } from '../shared/domsanitization.pipe'
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    DashboardComponent,
    InstancesListComponent,
    ChartsComponent,
    DomsanitizationPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    FormsModule,
    CardModule, 
    GridModule,
    BadgeModule,
    TableModule,
    IconModule,
    ButtonModule,
    UtilitiesModule,
    TooltipModule,
    ChartjsModule,
    NgSelectModule,
    SpinnerModule,
    ModalModule,
    FormModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ]
})
export class HomeModule { }
