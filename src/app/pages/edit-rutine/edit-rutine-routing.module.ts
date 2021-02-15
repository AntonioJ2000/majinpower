import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRutinePage } from './edit-rutine.page';

const routes: Routes = [
  {
    path: '',
    component: EditRutinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRutinePageRoutingModule {}
