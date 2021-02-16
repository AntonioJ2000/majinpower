import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ApiUserService } from 'src/app/services/api-user.service';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public tasks:FormGroup;

  constructor(private formBuilder:FormBuilder,
              public toastController: ToastController,
              public loadingController: LoadingController,
              private modalController:ModalController,
              private storage: NativeStorage,
              private authS:AuthService,
              private api:ApiUserService) { 
    
                this.tasks=this.formBuilder.group({
                  login:['',Validators.required],
                  password:['', Validators.required]
    })

              }

  public async login(){
    await this.presentLoading();
    this.authS.user.loginName = this.tasks.get('login').value;
    this.authS.user.password = this.tasks.get('password').value;
    
      this.authS.user = await this.api.existUser(this.authS.user.loginName, this.authS.user.password);

      if(this.authS.user != null){
        await this.authS.login(this.authS.user);
      }else{
        console.log("Error inicio")
      }   
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Validando credenciales',
      spinner:'crescent',
      duration: 200
    });
    await loading.present();
  }

  public async registerUser(){
    const modal = await this.modalController.create({
      component: RegisterPage,
      cssClass: 'my-custom-class',
    });
    modal.present();
  }

}
