import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TareasProvider } from '../../providers/tareas/tareas';
import { UsuarioProvider } from '../../providers/usuario/usuario';


/**
 * Generated class for the EsperaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-espera',
  templateUrl: 'espera.html',
})
export class EsperaPage {

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
       this.tareasProvider.obtenerServiciosGrupo(operadores, 'EN ESPERA DE PRODUCCIÓN')
       .subscribe(res=>{
         this.tareas = res
       
       })
    })
  }

  iniciarServicio(servicio) {
    const confirm = this.alertCtrl.create({
      title: 'Iniciar tarea',
      message: '¿Está seguro que desea iniciar la tarea seleccionada?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            var fechaActual = new Date();
            this.tareasProvider.iniciarServicio(servicio.id, fechaActual).subscribe((serv: any) => {
          
              this.obtenerTareas(this.usuario)
             
            })
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
     
          }
        }
      ]
    });
    confirm.present();
  }



}
