import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, IonSearchbar, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { timer } from 'rxjs';
import { PersonalRoutine } from '../model/personalRoutine';
import { User } from '../model/user';
import { EditRutinePage } from '../pages/edit-rutine/edit-rutine.page';
import { NewroutinePage } from '../pages/newroutine/newroutine.page';
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

constructor(private apiUser: ApiUserService,
            private apiPersonalRoutines: ApiPersonalRoutinesService,
            private router:Router,
            private authS:AuthService,
            public loadingController: LoadingController,
            public toastController: ToastController,
            public alertController: AlertController,
            private modalController:ModalController,
            private themeService:ThemeService,
            private actionSheetController:ActionSheetController) {
            this.user = authS.user;
}

startTimer(personalRoutine:PersonalRoutine){
  this.buttonDisabled = true;
  let time = timer(0, 1000);
  let subscription = time.subscribe(x =>{
    if(x == (personalRoutine.duration*60)){
      this.buttonDisabled = false;
      subscription.unsubscribe();
    }
  })
}

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
  await this.presentLoading();
  if(this.authS.user.id == -1){
    this.router.navigate(['/login'])
  }else{
    this.carga();
  }
}

public async carga(){

    try{
      this.listado = await this.apiPersonalRoutines.getPersonalRoutines(this.authS.user);
      this.rutinas = this.listado;
      console.log(this.listado)
    }catch(err){
      console.log(err)
      this.listado = null;
    }
}

public async addNewRoutine(){
  const modal = await this.modalController.create({
    component: NewroutinePage,
    cssClass: 'my-custom-class',
  });
  modal.present();

  return await modal.onDidDismiss()
    .then((onCreate)=>{
      this.carga();
    })
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

  public async borraRutina(id:any){
    await this.apiPersonalRoutines.deletePersonalRoutine(id);
    await this.presentToast('La rutina ha sido borrada con éxito');
    this.carga();
  }

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

  public async addZpower(){
    this.authS.user.zpower = this.authS.user.zpower + 1500;

    await this.apiUser.updateUser(this.authS.user);

    await this.presentToast('¡Has aumentado de poder!');
  }

  public async addRoutineTimesDoneCount(PersonalRoutine:PersonalRoutine){
    PersonalRoutine.timesDone = PersonalRoutine.timesDone + 1;

    await this.apiPersonalRoutines.updateRoutine(PersonalRoutine);
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
      cssClass: 'my-custom-class',
      message: '',
      spinner:'crescent',
      duration: 600
    });
    await loading.present();
  }

  enableLight(){
    this.themeService.enableLight();
  }

  enableDark(){
    this.themeService.enableDark();
  } 

  async themeSelector(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccione un tema',
      cssClass: 'editThemeMenu',
      mode:'md',
      buttons:[{
        text: 'Por defecto',
        icon: 'ellipse-outline',
        cssClass: 'editThemeMenu',
        handler: () =>{
          this.enableLight();
          //Native Storage
        }
      },{
        text: 'Modo Oscuro',
        icon: 'ellipse',
        cssClass: 'editThemeMenu',
        handler:() =>{
          this.enableDark();
          //Native Storage
        }


      }]

    });
    await actionSheet.present();
  }


}




