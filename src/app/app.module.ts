import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EsperaPage } from '../pages/espera/espera';
import { ProduccionPage } from '../pages/produccion/produccion';
import { FinalizadasPage } from '../pages/finalizadas/finalizadas';
import { LoginPage } from '../pages/login/login';
import { ApiProvider } from '../providers/api/api';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { HttpClient, HttpClientModule } from '../../node_modules/@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { TareasProvider } from '../providers/tareas/tareas';
import { PausaPage } from '../pages/pausa/pausa';
import { EnPausaPage } from '../pages/en-pausa/en-pausa';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EsperaPage,
    ProduccionPage,
    FinalizadasPage,
    LoginPage,
    PausaPage,
    EnPausaPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EsperaPage,
    ProduccionPage,
    FinalizadasPage,
    LoginPage,
    PausaPage,
    EnPausaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    UsuarioProvider,
    HttpClient,
    TareasProvider
  ]
})
export class AppModule {}
