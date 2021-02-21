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

  /**
   * Get all users from the database (not used)
   */
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

  /**
   * Get the 15 users with more zpower from the database
   */
  public getTopFighterz():Promise<User[] | null>{
    return new Promise((resolve, reject)=>{
        const endpoint=environment.endpoint + environment.apiUser + environment.topfighterzFilter;
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

/**
 * Return the user if he exists in the db
 * @param login loginName from the user
 * @param password password of the user
 */
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

 /**
  * Delete user from the db (unused) 
  * @param user user to delete
  */
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

  /**
   * Create user in the db
   * @param user user to create
   */
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

  /**
   * Update user in the db
   * @param user user to update
   */
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
        reject('No user exist');
      }
    })
  }

  /**
   * Update the user Zpower in the db (same as updateUser)
   * @param user 
   */
  public updateUserZpower(user:User):Promise<void>{
    const endpoint = environment.endpoint + environment.apiUser + environment.zpowerUpdate + user.id
    return new Promise((resolve, reject)=>{
      if(user){
        this.http.setDataSerializer('json');
        this.http
        .put(endpoint, user, this.header)
        .then(d =>{
          resolve();
        }).catch(err => reject(err))
      }else{
        reject('No user exists')
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
