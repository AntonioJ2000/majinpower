import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { ApiUserService } from 'src/app/services/api-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  public tasks:FormGroup;
  
  constructor(private formBuilder:FormBuilder,
              public toastController: ToastController,
              public loadingController: LoadingController,
              private api:ApiUserService,
              private modalController:ModalController) { 

                this.tasks=this.formBuilder.group({
                  login:['',Validators.required],
                  password:['', Validators.required]
   })
  }
  
  public async register(){
    await this.presentLoading();
    let user:User={
      loginName:this.tasks.get('login').value,
      password:this.tasks.get('password').value
    }

    console.log(user)
    this.api.createUser(user);
    await this.presentToast();
  }

  public closeForm(){
    this.modalController.dismiss();
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Creando su cuenta, por favor espere',
      spinner:'crescent',
      duration: 400
    });
    await loading.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      cssClass: 'myToast',
      message: '¡Te has registrado correctamente!',
      duration: 1500,
      position:"bottom"
    });
    toast.present();
  }
}
