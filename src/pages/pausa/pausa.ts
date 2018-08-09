import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/**
 * Generated class for the PausaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pausa',
  templateUrl: 'pausa.html',
})
export class PausaPage {

  motivo: any;

  form: FormGroup;

  constructor
  (
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController, 
    formBuilder: FormBuilder, 
  ) {
    this.form = formBuilder.group({
      motivo: ['', Validators.required],
      descripcion: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PausaPage');
  }

  seleccionarMotivo() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
  cancel() {
    this.viewCtrl.dismiss();
  }

}
