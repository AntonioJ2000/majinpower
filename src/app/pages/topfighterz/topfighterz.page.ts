import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { ApiUserService } from 'src/app/services/api-user.service';

@Component({
  selector: 'app-topfighterz',
  templateUrl: './topfighterz.page.html',
  styleUrls: ['./topfighterz.page.scss'],
})
export class TopfighterzPage {

  public fighterzlist:Array<User>;

  constructor(private apiUser: ApiUserService,
              private modalController:ModalController) { }

  
  async ionViewWillEnter(){
    this.cargaFighterz();
  }

  /**
   * Load the top users from the db
   */
  public async cargaFighterz(){
    try{
      this.fighterzlist = await this.apiUser.getTopFighterz();
    }catch(err){
      console.log(err)
      this.fighterzlist = null;
    }
  }

}
