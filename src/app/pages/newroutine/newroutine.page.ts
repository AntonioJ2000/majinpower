import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { PersonalRoutine } from 'src/app/model/personalRoutine';
import { ApiPersonalRoutinesService } from 'src/app/services/api-personal-routines.service';
import { ApiUserService } from 'src/app/services/api-user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-newroutine',
  templateUrl: './newroutine.page.html',
  styleUrls: ['./newroutine.page.scss'],
})
export class NewroutinePage {
  public tasks:FormGroup;

  constructor(private formBuilder:FormBuilder,
              public toastController: ToastController,
              public loadingController: LoadingController,
              private apiPersonalRoutines: ApiPersonalRoutinesService,
              private modalController:ModalController,
              private authS:AuthService) { 

                this.tasks=this.formBuilder.group({
                  title:['',Validators.required],
                  description:['', Validators.required],
                  duration:['', Validators.required],
                  difficulty:['', Validators.required]
   })
  }

  public async addRoutine(){
    await this.presentLoading();

    let personalRoutine:PersonalRoutine={
      title: this.tasks.get('title').value,
      description: this.tasks.get('description').value,
      duration: this.tasks.get('duration').value,
      difficulty: this.tasks.get('difficulty').value,
      timesDone:0,
      user: this.authS.user
    }

    this.apiPersonalRoutines.createPersonalRoutine(personalRoutine);

    await this.presentToast();
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Creando su rutina, espere',
      spinner:'crescent',
      duration: 400
    });
    await loading.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      cssClass: 'myToast',
      message: 'Rutina agregada correctamente',
      duration: 1000,
      position:"bottom"
    });
    toast.present();
  }

  public closeAdd(){
    this.modalController.dismiss();
  }

}
