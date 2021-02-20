import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { User } from '../model/user';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  public user:User = {
    id: -1,
    loginName: '',
    password: '',
    personalRoutines:[],
    zpower:0,
    image:''
  }

  constructor(private router:Router,
              private storage: NativeStorage) { }



  canActivate(route: ActivatedRouteSnapshot): boolean {
    if(!this.isLogged()){
      this.router.navigate(['/login']);
      return false;
    }else{
      return true;
    }
  }

  public isLogged(): boolean{
    if(this.user.id == -1){
      return false;
    }else{
      return true;
    }
  }

  public async login(user:User){
    this.user = user;
    this.router.navigate(['/'])
  }

  public async logout(){
    this.user.id = -1;
    this.user.loginName= '';
    this.user.password = '';
    this.user.personalRoutines = [];
    this.user.zpower = 0;
    this.user.image = '';
    
    this.router.navigate(['/login'])
  }


}
