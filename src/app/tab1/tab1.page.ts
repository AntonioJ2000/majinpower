import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalRoutine } from '../model/personalRoutine';
import { User } from '../model/user';
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
            private authS:AuthService) {
            this.user = authS.user;
}

ionViewWillEnter(){
  this.carga();
}

public async carga(){
  let usuarioXD:User= {
    id:1,
    loginName: 'Anto',
    password: 'god11'
  }

  try{
    this.listado = await this.apiPersonalRoutines.getPersonalRoutines(usuarioXD);
    console.log(this.listado)
  }catch(err){
    console.log(err)
    this.listado = null;
  }
}



}
