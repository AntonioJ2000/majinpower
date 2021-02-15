import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewroutinePageRoutingModule } from './newroutine-routing.module';

import { NewroutinePage } from './newroutine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewroutinePageRoutingModule
  ],
  declarations: [NewroutinePage]
})
export class NewroutinePageModule {}
