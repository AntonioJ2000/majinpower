import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ModalController } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  ApiUserService } from './services/api-user.service';
import { AuthService } from './services/auth.service';
import { HTTP } from '@ionic-native/http/ngx'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule,
     ReactiveFormsModule],
  providers: [
    AuthService,
    HTTP,
    ApiUserService,
    ModalController,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
