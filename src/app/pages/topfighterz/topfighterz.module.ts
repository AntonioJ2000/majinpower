import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopfighterzPageRoutingModule } from './topfighterz-routing.module';

import { TopfighterzPage } from './topfighterz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopfighterzPageRoutingModule
  ],
  declarations: [TopfighterzPage]
})
export class TopfighterzPageModule {}
