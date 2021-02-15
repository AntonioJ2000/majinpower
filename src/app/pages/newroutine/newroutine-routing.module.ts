import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewroutinePage } from './newroutine.page';

const routes: Routes = [
  {
    path: '',
    component: NewroutinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewroutinePageRoutingModule {}
