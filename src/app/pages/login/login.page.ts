import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { ApiUserService } from 'src/app/services/api-user.service';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public tasks:FormGroup;

  constructor(private formBuilder:FormBuilder,
              public toastController: ToastController,
              public loadingController: LoadingController,
              private modalController:ModalController,
              private authS:AuthService,
              private api:ApiUserService) { 
    
                this.tasks=this.formBuilder.group({
                  login:['',Validators.required],
                  password:['', Validators.required]
    })

              }

  ngOnInit() {
  }

  public async login(){
    await this.presentLoading();
      let user:User={
        loginName:this.tasks.get('login').value,
        password:this.tasks.get('password').value
      }

      user = await this.api.existUser(user.loginName, user.password);

      if(user != null){
        await this.authS.login(user);
      }else{
        console.log("Error inicio")
      }   
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Validando credenciales',
      spinner:'crescent',
      duration: 400
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
