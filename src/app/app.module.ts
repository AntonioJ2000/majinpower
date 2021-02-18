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
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ThemeService } from './services/theme.service';

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
    NativeStorage,
    ThemeService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
