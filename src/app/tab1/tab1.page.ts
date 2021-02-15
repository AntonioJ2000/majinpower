import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { PersonalRoutine } from '../model/personalRoutine';
import { User } from '../model/user';
import { EditRutinePage } from '../pages/edit-rutine/edit-rutine.page';
import { NewroutinePage } from '../pages/newroutine/newroutine.page';
import { RegisterPage } from '../pages/register/register.page';
import { ApiPersonalRoutinesService } from '../services/api-personal-routines.service';
import { ApiUserService } from '../services/api-user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
public listado:Array<PersonalRoutine>;
public user:User;

constructor(private apiUser: ApiUserService,
            private apiPersonalRoutines: ApiPersonalRoutinesService,
            private router:Router,
            private authS:AuthService,
            public toastController: ToastController,
            public alertController: AlertController,
            private modalController:ModalController) {
            this.user = authS.user;
}

ionViewWillEnter(){
  this.carga();
}

public async carga(){

    try{
      this.listado = await this.apiPersonalRoutines.getPersonalRoutines(this.authS.user);
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
    await this.apiPersonalRoutines.deleteUser(id);
    await this.presentToast();
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

  async presentToast() {
    const toast = await this.toastController.create({
      cssClass: 'myToast',
      message: 'La rutina se ha borrado correctamente',
      duration: 1000,
      position:"bottom"
    });
    toast.present();
  }

}




