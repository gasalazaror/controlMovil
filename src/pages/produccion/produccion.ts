import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TareasProvider } from '../../providers/tareas/tareas';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ModalController } from 'ionic-angular';
import { PausaPage } from '../pausa/pausa';

/**
 * Generated class for the ProduccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produccion',
  templateUrl: 'produccion.html',
})
export class ProduccionPage {

  usuario: any
  tareas: any

  constructor
    (
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController,
    public tareasProvider: TareasProvider,
    public usuarioProvider: UsuarioProvider,
    public modalCtrl: ModalController
    ) {
    this.usuario = { persona: { nombre: '' } }
    this.tareas = []

    this.storage.get('usuario').then(res => {
      this.usuario = res
    })
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.storage.get('usuario').then(res => {
      this.usuario = res
      this.obtenerTareas(this.usuario)
    })

  }

  pausar(servicio) {
    let modalPausa = this.modalCtrl.create(PausaPage)

    modalPausa.onDidDismiss(motivo => {
      if(motivo){this.pausarServicio(servicio, motivo)}
    })
    modalPausa.present();
  }








  obtenerTareas(usuario) {
    this.usuarioProvider.obtenerUnUsuario(usuario.id).subscribe(res => {
      this.usuario = res
      var operadores = '['
      this.usuario.operadores.forEach(operador => {
        operadores += '{"operador":"' + operador.id + '"},'
      });
      operadores = operadores.slice(0, operadores.length - 1) + "]"
      this.tareasProvider.obtenerServiciosGrupo(operadores, 'EN PRODUCCIÓN')
        .subscribe(res => {
          this.tareas = res
        })
    })
  }


  finalizarServicio(servicio) {
    const confirm = this.alertCtrl.create({
      title: 'Finalizar tarea',
      message: '¿Está seguro que desea finalizar la tarea seleccionada?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            var fechaActual = new Date();
            this.tareasProvider.finalizarServicio(servicio.id, fechaActual).subscribe((serv: any) => {

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

  pausarServicio(servicio, motivo) {


    const confirm = this.alertCtrl.create({
      title: 'Pausar tarea tarea',
      message: '¿Está seguro que desea pausar la tarea seleccionada?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log(servicio)
            console.log(motivo)
            var fechaActual = new Date();
            this.tareasProvider.pausarServicio(servicio.id, fechaActual, motivo).subscribe((serv: any) => {
              this.tareasProvider.modificarEstado(servicio.id, 'EN PRODUCCIÓN - PAUSADO', serv.id).subscribe(res => {
        
                this.obtenerTareas(this.usuario)
              })
              
             
            }, error =>{
              console.log(error`
              `)
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
