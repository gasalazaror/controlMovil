import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the TareasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TareasProvider {

  constructor(public http: HttpClient, public api: ApiProvider) {
    console.log('Hello TareasProvider Provider');
  }

  obtenerServiciosGrupo(operadores, estado){
    var url = 'ordenservicio?where={"and":[{"estado": "'+estado+'"}], "or":'+operadores+'}'
    return this.api.get(url)
  }

  obtenerDetalle(orden){
    return this.api.post('reporte', {sql: "SELECT * FROM vista_reporte WHERE ordenservicio='"+orden+"'"})
  }

  obtenerServiciosGrupoProd(operadores, estado){
    var url = 'ordenservicio?where={"and":[{"estado": "'+estado+'"}], "or":'+operadores+'}'
    return this.api.get(url)
  }

  pausarServicio(servicio, horaInicio, razon) {
    return this.api.post('pausa', { ordenServicio: servicio, horaInicio: horaInicio, motivo: razon.motivo, descripcion: razon.descripcion })
  }

  modificarEstado(ordenServicio, estado, pausaActual) {
    return this.api.put('ordenServicio/' + ordenServicio, { estado: estado, pausaActual: pausaActual })
  }

  reanudarServicio(pausa, horaFin) {
    return this.api.put('pausa/' + pausa, { horaFin: horaFin })
  }

  iniciarServicio(servicio, horaInicio) {
    return this.api.put('ordenservicio/' + servicio, { horaInicio: horaInicio, estado: 'EN PRODUCCIÓN' });
  }

  finalizarServicio(servicio, horaFin) {
    return this.api.put('ordenservicio/' + servicio, { horaFin: horaFin, estado: 'POR FACTURAR' });
  }

}
