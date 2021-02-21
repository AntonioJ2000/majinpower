import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { PersonalRoutine } from '../model/personalRoutine';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiPersonalRoutinesService {

  constructor(private http:HTTP) { }

  /**
   * get all personal routines given a user
   * @param user user to get the routines from
   */
  public getPersonalRoutines(user: User):Promise<PersonalRoutine[] | null>{
    return new Promise((resolve, reject)=>{
        const endpoint=environment.endpoint + environment.apiPersonalRoutine + user.id;
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
 * create a personal routine in the db
 * @param personalRoutine personal routine you want to create
 */
public createPersonalRoutine(personalRoutine:PersonalRoutine):Promise<void>{
  const endpoint = environment.endpoint + environment.apiPersonalRoutine;
  return new Promise((resolve, reject)=>{
    if(personalRoutine){
      this.http.setDataSerializer('json');
      this.http
      .post(endpoint, personalRoutine, this.header)
      .then(d =>{
        resolve();
      }).catch(err => reject(err))
    }else{
      reject('No Personal Routine provided')
    }
  })
}

/**
 * delete a personal routine from the db
 * @param id personal routine you want to delete
 */
public deletePersonalRoutine(id:any):Promise<void>{
  const endpoint = environment.endpoint + environment.apiPersonalRoutine + id;
  return new Promise((resolve, reject)=>{
    this.http
    .delete(endpoint,{},this.header)
    .then(d =>{
      resolve();
    }).catch(err => reject(err))
  })
}

/**
 * update routine in the db
 * @param personalRoutine the routine you want to be updated
 */
public updateRoutine(personalRoutine:PersonalRoutine):Promise<void>{
  const endpoint = environment.endpoint + environment.apiPersonalRoutine;
  return new Promise ((resolve, reject)=>{
    if(personalRoutine){
      this.http.setDataSerializer('json');
      this.http
      .put(endpoint, personalRoutine, this.header)
      .then(d =>{
        resolve();
      }).catch(err => reject(err))
    }else{
      reject('No routine exist')
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
