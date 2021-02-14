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

private get header():any{
  return {
    'Access-Control-Allow-Origin': '*',
    'Content-Type':'application/json'
  }
}
}
