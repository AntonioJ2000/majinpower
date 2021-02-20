import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { ApiUserService } from 'src/app/services/api-user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  public user:User;

  public tasks:FormGroup;

  constructor(private formBuilder:FormBuilder,
              public loadingController: LoadingController,
              public toastController: ToastController,
              private modalController:ModalController,
              private authS:AuthService,
              private userApi:ApiUserService,
              private camera:Camera) {    
    
                  this.user = this.authS.user;

    this.tasks = this.formBuilder.group({
    loginName:['', [Validators.required, Validators.minLength(6)]],
    password:['', [Validators.required, Validators.minLength(6)]]
    }) 
  }

  ionViewWillEnter(){
    this.tasks.get('loginName').setValue(this.authS.user.loginName);
    this.tasks.get('password').setValue(this.authS.user.password); 
  }

  public async editProfile(){
    await this.presentLoading();
    let user:User={
      id:this.authS.user.id,
      image: this.authS.user.image,
      loginName:this.tasks.get('loginName').value,
      password:this.tasks.get('password').value,
      personalRoutines:this.authS.user.personalRoutines,
      zpower:this.authS.user.zpower
    }

    await this.userApi.updateUser(user);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'edit-loading',
      message: 'Guardando cambios, por favor, espere',
      spinner:'crescent',
    });
    await loading.present();

    setTimeout(async ()=>{
      loading.dismiss();
      await this.presentToast();
    }, 800)
  }

  async presentToast() {
    const toast = await this.toastController.create({
      cssClass: 'myToast',
      message: "El perfil se ha editado correctamente",
      duration: 1000,
      position:"bottom"
    });
    toast.present();
  }

  public closeEdit(){
    this.modalController.dismiss();
  }

    getCamera(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI
    }).then((res)=>{
      this.user.image = 'data:image/jpeg;base64,' + res;
    }).catch(e => {
      console.log(e);
    })
  }

  public getGallery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((res)=>{
      this.user.image = 'data:image/jpeg;base64,' + res;
    }).catch(e => {
      console.log(e);
    })
  }

}
