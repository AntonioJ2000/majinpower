import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRutinePageRoutingModule } from './edit-rutine-routing.module';

import { EditRutinePage } from './edit-rutine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditRutinePageRoutingModule
  ],
  declarations: [EditRutinePage]
})
export class EditRutinePageModule {}
