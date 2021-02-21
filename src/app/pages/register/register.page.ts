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
  
  /**
   * Register a certain user with the given parameters
   */
  public async register(){
    let msgNegative:string = 'No se ha registrado correctamente, compruebe los campos e inténtelo más tarde';
    let msgPositive:string = '¡Te has registrado correctamente!'

    let confirmedPassword = this.tasks.get('confirmPassword').value

    let user:User={
      loginName:this.tasks.get('login').value,
      password:this.tasks.get('password').value
    }

    console.log(user)
    if(confirmedPassword == user.password){
      await this.presentLoadingPositive(msgPositive); 
      this.api.createUser(user);
    }else{
      await this.presentLoadingPositive(msgNegative); 
    }
      
  }

  public closeForm(){
    this.modalController.dismiss();
  }

  async presentLoadingPositive(msgPositive){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Creando su cuenta, por favor espere',
      spinner:'crescent',
    });
    await loading.present();

    setTimeout(()=>{
      loading.dismiss();
      this.presentToast(msgPositive);
    },1200)
  }

  async presentLoadingNegative(msgNegative){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Creando su cuenta, por favor espere',
      spinner:'crescent',
    });
    await loading.present();

    setTimeout(()=>{
      loading.dismiss();
      this.presentToast(msgNegative);
    },1200)
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      cssClass: 'myToast',
      message: msg,
      duration: 1000,
      position:"bottom"
    });
    toast.present();
  }
}
