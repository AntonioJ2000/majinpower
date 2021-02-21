import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ActionSheetController, AlertController, IonSearchbar, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { timer } from 'rxjs';
import { PersonalRoutine } from '../model/personalRoutine';
import { User } from '../model/user';
import { EditRutinePage } from '../pages/edit-rutine/edit-rutine.page';
import { NewroutinePage } from '../pages/newroutine/newroutine.page';
import { ProfilePage } from '../pages/profile/profile.page';
import { TopfighterzPage } from '../pages/topfighterz/topfighterz.page';
import { ApiPersonalRoutinesService } from '../services/api-personal-routines.service';
import { ApiUserService } from '../services/api-user.service';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{

  @ViewChild('search',{static:false})search:IonSearchbar;

public rutinas=[];
public listado:Array<PersonalRoutine>;
public user:User;
public buttonDisabled:boolean = false;

public majin = 'assets/majin.png';
public defaulticon = 'assets/defaulticon.png';

constructor(private apiUser: ApiUserService,
            private apiPersonalRoutines: ApiPersonalRoutinesService,
            private router:Router,
            private authS:AuthService,
            public loadingController: LoadingController,
            public toastController: ToastController,
            public alertController: AlertController,
            private modalController:ModalController,
            private themeService:ThemeService,
            private actionSheetController:ActionSheetController,
            private nativeStorage: NativeStorage) {
            this.user = authS.user;
}

/**
 * starts a timer to disable the button
 * @param personalRoutine the function get the duration to disable the button for that time
 */
startTimer(personalRoutine:PersonalRoutine){
  this.buttonDisabled = true;
  let time = timer(0, 1000);
  let subscription = time.subscribe(x =>{
    if(personalRoutine.duration<10){
      personalRoutine.duration = 10;
    }
    if(x == (personalRoutine.duration*60)){
      this.buttonDisabled = false;
      subscription.unsubscribe();
    }
  })
}

/**
 * Allows user to search a routine
 * @param ev event
 */
public searchRoutine(ev:any){
  const val = ev.target.value;
  this.listado = this.rutinas;
  if(val && val.trim()!= ''){
    this.listado = this.listado.filter((rutina)=>{
      return (rutina.title.toLowerCase().indexOf(val.toLowerCase()) > -1)
    })
  }
}

async ionViewWillEnter(){
  try{
    this.nativeStorage.getItem('themeColor')
    .then((like) => {  
      if(like.theme == 'dark-theme'){
        this.majin = 'assets/majindm.png';
         this.defaulticon = 'assets/defaulticondm.png'
      }
    })
  }catch(err){
    console.log("EEE")
  }
  await this.presentLoading();
  if(this.authS.user.id == -1){
    this.router.navigate(['/login'])
  }else{
    this.carga();
  }
}

/**
 * Loads the personal routine list
 */
public async carga($event=null){
    try{
      this.listado = await this.apiPersonalRoutines.getPersonalRoutines(this.authS.user);
      this.rutinas = this.listado;
    }catch(err){
      console.log(err)
      this.listado = null;
    }
}

/**
 * Log out from the app
 */
public async logOut(){
  this.nativeStorage.remove('user');
  await this.presentLoadingLeaving();
}

  public async addNewRoutine(){
    const modal = await this.modalController.create({
      component: NewroutinePage,
      cssClass: 'my-custom-class'
    });
    modal.present();

    return await modal.onDidDismiss()
      .then((onCreate)=>{
        this.carga();
      })
  }

  public async goFighterzTierlist(){
    const modal = await this.modalController.create({
      component: TopfighterzPage,
      cssClass: 'my-custom-class'
    });
    modal.present();
  }

  public async confirmDeleteRoutine(id:any){
    const alert = await this.alertController.create({
        
      cssClass: 'deleteNote',
      header: "Borrar rutina",
      message: "¿Está usted seguro de que desea borrar la rutina?",
      buttons: [
        {
          text: "Cancelar",
          role: 'cancel',
          cssClass: 'alertCancel',
          handler: () => {
          }
        }, {
          text: "Borrar",
          cssClass: 'alertDelete',
          handler: () => {
            this.borraRutina(id);
          }
        },
      ]
    });

    await alert.present();
  }

  /**
   * delete a routine
   * @param id of the routine you want to delete
   */
  public async borraRutina(id:any){
    await this.apiPersonalRoutines.deletePersonalRoutine(id);
    await this.presentToast('La rutina ha sido borrada con éxito');
    this.carga();
  }

  /**
   * opens a modal to edit a routine
   * @param personalRoutine routine you want to update 
   */
  public async editaRutina(personalRoutine:PersonalRoutine){
    const modal = await this.modalController.create({
      component: EditRutinePage,
      cssClass: 'my-custom-class',
      componentProps:{
        personalRoutine:personalRoutine
      }
    });
    modal.present();
    
    return await modal.onDidDismiss()
    .then((onEdit)=>{
      this.carga();
    })
  }

  /**
   * opens a modal to open the user profile
   */
  public async userProfile(){
    const modal = await this.modalController.create({
      component: ProfilePage,
      cssClass: 'my-custom-class',
    });
    modal.present();
  }

  /**
   * Adds to the user a certain amount of Zpower
   */
  public async addZpower(){
    this.authS.user.zpower = this.authS.user.zpower + 1500
    let userToDB:User={
      id:this.authS.user.id,
      image: this.authS.user.image,
      loginName:this.authS.user.loginName,
      password:this.authS.user.password,
      personalRoutines:this.authS.user.personalRoutines,
      zpower:this.authS.user.zpower
    }

    this.apiUser.updateUser(userToDB).then(async (res)=>{
      await this.presentToast('¡Has aumentado de poder!');
    });
  }

  /**
  * Add to the routine times done count a unit 
  * @param PersonalRoutine routine to update
  */
  public async addRoutineTimesDoneCount(PersonalRoutine:PersonalRoutine){
    PersonalRoutine.timesDone = PersonalRoutine.timesDone + 1;

    let personalRoutineToDB:PersonalRoutine= {
      id: PersonalRoutine.id,
      title: PersonalRoutine.title,
      description: PersonalRoutine.description,
      difficulty:PersonalRoutine.difficulty,
      duration:PersonalRoutine.duration,
      user:PersonalRoutine.user,
      timesDone: PersonalRoutine.timesDone
    }

    await this.apiPersonalRoutines.updateRoutine(personalRoutineToDB);
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      cssClass: 'myToast',
      message: message,
      duration: 1000,
      position:"bottom"
    });
    toast.present();
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      cssClass: 'list-loading',
      message: '',
      spinner:'crescent',
      duration: 600
    });
    await loading.present();
  }

  async presentLoadingLeaving(){
    const loading = await this.loadingController.create({
      cssClass: 'logout-loading',
      message: 'Cerrando Sesión, por favor, espere',
      spinner:'crescent',
    });
    await loading.present();

    setTimeout(async ()=>{
      loading.dismiss();
      await this.authS.logout();
    },1500)
  }


  enableLight(){
    this.majin = 'assets/majin.png';
    this.defaulticon = 'assets/defaulticon.png';


    this.themeService.enableLight();
  }

  enableDark(){
    this.majin = 'assets/majindm.png';
    this.defaulticon = 'assets/defaulticondm.png'

    this.themeService.enableDark();
  } 

  enableTurtleHermit(){
    this.majin = 'assets/majin.png';
    this.defaulticon = 'assets/defaulticon.png';

    this.themeService.enableTurtleHermit();
  }

  enableNamekian(){
    this.majin = 'assets/majin.png';
    this.defaulticon = 'assets/defaulticon.png';

    this.themeService.enableNamekian();
  }

  enableBuu(){
    this.majin = 'assets/majin.png';
    this.defaulticon = 'assets/defaulticon.png';

    this.themeService.enableBuu();
  }

  async themeSelector(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccione un tema',
      cssClass: 'editThemeMenu',
      mode:'md',
      buttons:[{
        text: 'Por defecto',
        icon: 'assets/sun.svg',
        cssClass: 'editThemeMenu',
        handler: () =>{
          this.enableLight();
          //Native Storage
          this.nativeStorage.setItem('themeColor', {theme:'default-theme'})
        }
      },{
        text: 'Modo Oscuro',
        icon: 'assets/moon.svg',
        cssClass: 'editThemeMenu',
        handler:() =>{
          this.enableDark();
          //Native Storage
          this.nativeStorage.setItem('themeColor', {theme:'dark-theme'})
        }
      },{
        text: 'Turtle Hermit Gi',
        icon: 'assets/hermit-gi.svg',
        cssClass: 'editThemeMenu',
        handler:() =>{
          this.enableTurtleHermit();
          //Native Storage
          this.nativeStorage.setItem('themeColor', {theme:'turtleHermit-theme'})
        }
      },{
        text: 'Namekian',
        icon: 'assets/namek.svg',
        cssClass: 'editThemeMenu',
        handler:() =>{
          this.enableNamekian();
          //Native Storage
          this.nativeStorage.setItem('themeColor', {theme:'namekian-theme'})
        }
      },{
        text: 'Majin Buu',
        icon: 'assets/buu.svg',
        cssClass: 'editThemeMenu',
        handler:() =>{
          this.enableBuu();
          //Native Storage
          this.nativeStorage.setItem('themeColor', {theme:'buu-theme'})
        }
      }]

    });
    await actionSheet.present();
  }



}




