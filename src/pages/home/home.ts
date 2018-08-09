import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { EsperaPage } from '../espera/espera';
import { ProduccionPage } from '../produccion/produccion';
import { FinalizadasPage } from '../finalizadas/finalizadas';
import { ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EnPausaPage } from '../en-pausa/en-pausa';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario: any

  tab1Root: any = EsperaPage;
  tab2Root: any = ProduccionPage;
  tab3Root: any = FinalizadasPage;
  tab4Root: any = EnPausaPage;

  tab1Title = "En espera";
  tab2Title = "En producción";
  tab3Title = "Finalizadas";
  tab4Title = "En pausa"


  constructor
    (
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public storage: Storage, ) {

    this.usuario = { persona: { nombre: '' } }

    this.storage.get('usuario').then(res => {
      this.usuario = res
    })
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Cerrar sesión',
      message: '¿Está seguro que desea cerrar sesión?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: this.usuario.persona.nombre,
      buttons: [
        {
          text: 'Cerrar sesión',
          role: 'destructive',
          handler: () => {
            this.showConfirm()
          }
        }
      ]
    });
    actionSheet.present();
  }

}
