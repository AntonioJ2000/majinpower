import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { User } from '../model/user';

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
  
  loged:boolean = false;

  constructor(private router:Router) { }



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

  /**
   * Makes the user log in if exists in the database
   * @param user user to log in
   */
  public async login(user:User){
    this.loged = true;
    this.user = user;
    this.router.navigate(['/'])
  }

  /**
   * Log out from the app
   */
  public async logout(){
    this.loged = false;
    this.user.id = -1;
    this.user.loginName= '';
    this.user.password = '';
    this.user.personalRoutines = [];
    this.user.zpower = 0;
    this.user.image = '';
    
    this.router.navigate(['/login'])
  }


}
