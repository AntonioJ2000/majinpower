import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { PersonalRoutine } from 'src/app/model/personalRoutine';
import { ApiPersonalRoutinesService } from 'src/app/services/api-personal-routines.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-rutine',
  templateUrl: './edit-rutine.page.html',
  styleUrls: ['./edit-rutine.page.scss'],
})
export class EditRutinePage {

  @Input('personalRoutine') personalRoutine:PersonalRoutine;

  public tasks:FormGroup;
  
  constructor(private formBuilder:FormBuilder,
              private apiPersonalRoutines: ApiPersonalRoutinesService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              private modalController:ModalController,
              private authS:AuthService) { 
                
                this.tasks=this.formBuilder.group({
                  title:['',Validators.required],
                  description:['', Validators.required],
                  duration:['', Validators.required],
                  difficulty:['', Validators.required]
  })
}

  ionViewDidEnter(){
    this.tasks.get('title').setValue(this.personalRoutine.title);
    this.tasks.get('description').setValue(this.personalRoutine.description);
    this.tasks.get('duration').setValue(this.personalRoutine.duration);
    this.tasks.get('difficulty').setValue(this.personalRoutine.difficulty);
  }

  /**
   * edit the user routine and save it in the db
   */
  public async editRoutine(){
    await this.presentLoading();
    let personalRoutine:PersonalRoutine={
      id:this.personalRoutine.id,
      title: this.tasks.get('title').value,
      description: this.tasks.get('description').value,
      duration: this.tasks.get('duration').value,
      difficulty: this.tasks.get('difficulty').value,
      user: this.authS.user
    }

    await this.apiPersonalRoutines.updateRoutine(personalRoutine);
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
      message: "La rutina se ha editado correctamente",
      duration: 1000,
      position:"bottom"
    });
    toast.present();
  }

  public closeEdit(){
    this.modalController.dismiss();
  }
  
}
