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
                  login:['',[Validators.required, Validators.minLength(6)]],
                  password:['', [Validators.required, Validators.minLength(6)]],
                  confirmPassword:['',[Validators.required]]
   })
  }
  
  public async register(){
    await this.presentLoading();
    let msgNegative:string = 'No se ha registrado correctamente, compruebe los campos e inténtelo más tarde';
    let msgPositive:string = '¡Te has registrado correctamente!'

    let confirmedPassword = this.tasks.get('confirmPassword').value

    let user:User={
      loginName:this.tasks.get('login').value,
      password:this.tasks.get('password').value
    }

    console.log(user)
    if(confirmedPassword == user.password){
      this.api.createUser(user);
      await this.presentToast(msgPositive);
    }else{
      await this.presentToast(msgNegative);
    }
    
    
  }

  public closeForm(){
    this.modalController.dismiss();
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Creando su cuenta, por favor espere',
      spinner:'crescent',
      duration: 800
    });
    await loading.present();
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      cssClass: 'myToast',
      message: msg,
      duration: 1200,
      position:"bottom"
    });
    toast.present();
  }
}
