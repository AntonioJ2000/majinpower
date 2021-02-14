import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { rejects } from 'assert';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(private http:HTTP) { }

  public getUsers():Promise<User[] | null>{
      return new Promise((resolve, reject)=>{
          const endpoint=environment.endpoint + environment.apiUser;
          this.http.get(endpoint,{},this.header)
          .then(d=>{
            if(d){
              resolve(JSON.parse(d.data))
            }else{
              resolve(null);
            }
          }).catch(err=>reject(err))
      });
  }

  public existUser(login:string, password:string):Promise<User | null>{
    return new Promise((resolve, reject)=>{
      const endpoint = environment.endpoint + environment.apiUser + environment.existFilter + login + '_' + password;
      this.http.get(endpoint,{},this.header)
      .then(d=>{
        if(d){
          resolve(JSON.parse(d.data))
        }else{
          resolve(null);
        }
      }).catch(err=>reject(err))

    })
  }

  public deleteUser(user:User):Promise<void>{
    const id:any = user.id ? user.id:user;
    let endpoint = environment.endpoint + environment.apiUser + id;
    return new Promise((resolve, reject) =>{
      this.http
        .delete(endpoint, {}, this.header)
        .then(d =>{
          resolve();
        }).catch(err => reject(err));
    })
  }

  public createUser(user:User):Promise<void>{
    const endpoint = environment.endpoint + environment.apiUser;
    return new Promise((resolve, reject)=>{
      if(user){
        this.http.setDataSerializer('json');
        this.http
          .post(endpoint, user, this.header)
          .then(d => {
            resolve();
          }).catch(err => reject(err))
      }else{
        reject('No user provided');
      }
    })
  }

  public updateUser(user:User):Promise<void>{
    const endpoint = environment.endpoint + environment.apiUser;
    return new Promise((resolve, reject)=>{
      if(user){
        this.http.setDataSerializer('json');
        this.http
          .put(endpoint,user,this.header)
          .then(d =>{
            resolve();
          }).catch(err => reject(err))
      }else{
        reject('No existe item');
      }
    })
  }

  private get header():any{
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type':'application/json'
    }
  }


}
