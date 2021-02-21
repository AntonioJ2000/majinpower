import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
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
  
  user:User = this.authS.user;

  public tasks:FormGroup;

  constructor(private formBuilder:FormBuilder,
              public loadingController: LoadingController,
              public toastController: ToastController,
              private modalController:ModalController,
              private authS:AuthService,
              private userApi:ApiUserService,
              private camera:Camera,
              private nativeStorage: NativeStorage) {    
    

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
    this.presentLoading();
    let user:User={
      id:this.authS.user.id,
      image: this.user.image,
      loginName:this.tasks.get('loginName').value,
      password:this.tasks.get('password').value,
      personalRoutines:this.authS.user.personalRoutines,
      zpower:this.authS.user.zpower
    }

      this.authS.user.loginName = user.loginName;
      this.authS.user.password = user.password;
      this.nativeStorage.remove('user');
      this.nativeStorage.setItem('user', {loginName:this.authS.user.loginName, password:this.authS.user.password})

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

    public getCamera(){
    this.camera.getPicture({
      targetHeight:500,
      targetWidth:500,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      correctOrientation: true
    }).then((res)=>{
      this.user.image = 'data:image/jpeg;base64,' + res;
    }).catch(e => {
      console.log(e);
    })
  }

  public getGallery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      correctOrientation: true
    }).then((res)=>{
      this.user.image = 'data:image/jpeg;base64,' + res;
    }).catch(e => {
      console.log(e);
    })
  }

}
