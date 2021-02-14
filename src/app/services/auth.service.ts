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
    zpower:0
  }

  constructor(private router:Router) { }



  canActivate(route: ActivatedRouteSnapshot): boolean {
    return true;
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
    
    this.router.navigate(['/login'])
  }


}
