import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  _user: any;

  constructor(public http: HttpClient, public api: ApiProvider) {
    console.log('Hello UsuarioProvider Provider');
  }

  login(accountInfo: any) {
    let seq = this.api.post('login', accountInfo);
    return seq;
  }

  obtenerUnUsuario(id){
    return this.api.get('usuario/'+id)
  }

}
