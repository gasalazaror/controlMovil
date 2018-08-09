import { Component } from '@angular/core';
import { IonicPage , AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TareasProvider } from '../../providers/tareas/tareas';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the EnPausaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-en-pausa',
  templateUrl: 'en-pausa.html',
})
export class EnPausaPage {

  usuario: any
  tareas: any

  constructor
    (
    public storage: Storage,
    public alertCtrl: AlertController,
    public tareasProvider: TareasProvider,
    public usuarioProvider: UsuarioProvider,
    public modalCtrl: ModalController
    ) {

    this.usuario = { persona: { nombre: '' } }
    this.tareas = []
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
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
      this.tareasProvider.obtenerServiciosGrupo(operadores, 'EN PRODUCCIÓN - PAUSADO')
        .subscribe(res => {
          this.tareas = res
          this.tareas.forEach(tarea => {
            tarea.pausas.forEach(pausa => {
              if (pausa.id == tarea.pausaActual) {
                tarea.pausaActual = pausa
              }
            });
          });

        })
    })
  }



  reanudarServicio(servicio) {
    const confirm = this.alertCtrl.create({
      title: 'Reanudar tarea',
      message: '¿Está seguro que desea reanudar la tarea seleccionada?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
       
            var fechaActual = new Date();
            this.tareasProvider.reanudarServicio(servicio.pausaActual.id, fechaActual).subscribe(serv => {
              this.tareasProvider.modificarEstado(servicio.id, 'EN PRODUCCIÓN', '').subscribe(res => {
                this.obtenerTareas(this.usuario)

              })
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
