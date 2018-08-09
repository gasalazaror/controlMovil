import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TareasProvider } from '../../providers/tareas/tareas';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the FinalizadasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finalizadas',
  templateUrl: 'finalizadas.html',
})
export class FinalizadasPage {

  usuario: any
  tareas: any

  constructor
  (
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController,
    public tareasProvider: TareasProvider,
    public usuarioProvider: UsuarioProvider
  ) {
    this.usuario = { persona: { nombre: '' } }
    this.tareas = []
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.storage.get('usuario').then(res => {
      this.usuario = res
      this.obtenerTareas(this.usuario)
    })
  }


  obtenerTareas(usuario) {
    this.usuarioProvider.obtenerUnUsuario(usuario.id).subscribe(res => {
      this.usuario = res
      var operadores = '['
      this.usuario.operadores.forEach(operador => {
        operadores += '{"operador":"' + operador.id + '"},'
      });
      operadores = operadores.slice(0, operadores.length - 1) + "]"
       this.tareasProvider.obtenerServiciosGrupo(operadores, 'POR FACTURAR')
       .subscribe(res=>{
         this.tareas = res

         this.tareas.forEach(tarea => {
           this.tareasProvider.obtenerDetalle(tarea.id).subscribe((res:any)=>{
             if(res.rows[0]){
               tarea.detalle = res.rows[0]
             }
           })
         });

    
       })
    })
  }



}
