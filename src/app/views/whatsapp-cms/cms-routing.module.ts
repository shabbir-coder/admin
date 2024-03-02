import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsHomeComponent } from './cms-home/cms-home.component';
import { FormComponent } from './form/form.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
  { path: '', component: CmsHomeComponent },
  { path: 'edit/:id', component: FormComponent },
  { path: 'create', component: FormComponent },
  { path: 'view/:id', component: PreviewComponent },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
