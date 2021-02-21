import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ApiUserService } from 'src/app/services/api-user.service';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterPage } from '../register/register.page';
import { ThemeService } from 'src/app/services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  public tasks:FormGroup;

  constructor(private formBuilder:FormBuilder,
              public toastController: ToastController,
              public loadingController: LoadingController,
              private modalController:ModalController,
              private storage: NativeStorage,
              private authS:AuthService,
              private themeService:ThemeService,
              private api:ApiUserService,
              private router:Router) { 
    
                this.tasks=this.formBuilder.group({
                  login:['',Validators.required],
                  password:['', Validators.required]
    })

              }
  ngOnInit() {
    try{
      this.storage.getItem('themeColor')
      .then((like) => {  
        this.themeService.setThemeOnInit(like.theme);
      })
    }catch(err){
      console.log("EEE")
    }
    
    try{
      this.storage.getItem('user')
      .then((user) =>{
          this.loginNative(user.loginName, user.password); 
      })
    }catch(err){
      console.log("EEE")
    }
  }

  ionViewWillEnter(){
    if(this.authS.loged == true){
          this.router.navigate(['/'])
    }
  }

  public async login(){
    await this.presentLoading();
    this.authS.user.loginName = this.tasks.get('login').value;
    this.authS.user.password = this.tasks.get('password').value;

    try{
      this.authS.user = await this.api.existUser(this.authS.user.loginName, this.authS.user.password);
    }catch(err){
      this.tasks.get('password').setValue('');
      await this.presentToast();
    }  
      if(this.authS.user.id != -1){
         this.storage.setItem('user', {loginName:this.authS.user.loginName, password:this.authS.user.password})
         this.authS.login(this.authS.user);
      }
  }

  public async loginNative(loginName:string, password:string){
    await this.presentLoading();

    try{
      this.authS.user = await this.api.existUser(loginName, password);
    }catch(err){
      await this.presentToast();
    }

    if(this.authS.user.id != -1){
      this.authS.login(this.authS.user);
   }
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      cssClass: 'login-loading',
      message: 'Validando credenciales',
      spinner:'crescent',
    });
    await loading.present();

    setTimeout(()=>{
      loading.dismiss();
    }, 350)
  }

  async presentToast() {
    const toast = await this.toastController.create({
      cssClass: 'errorToast',
      message: 'Error en el inicio de sesión, introduzca de nuevo los campos o inténtelo de nuevo más tarde.',
      duration: 2300,
      position:"bottom"
    });
    toast.present();
  }

  public async registerUser(){
    const modal = await this.modalController.create({
      component: RegisterPage,
      cssClass: 'my-custom-class',
    });
    modal.present();
  }

}
