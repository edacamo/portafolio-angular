import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPage } from '../interfaces/info-page.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

  info: InfoPage = {};
  cargada = false;

  equipo: any [] = [];

  constructor( private http: HttpClient ) {
    // console.log('Servicio de info page listo');

    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
     // Leer el archivo JSON
     this.http.get('assets/data/data-page.json')
     .subscribe( (resp: InfoPage)  => {

         this.cargada = true;
         this.info = resp;
         // console.log( resp);
     });
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-850cb.firebaseio.com/equipo.json')
    .subscribe( (res: any []) => {
       this.equipo = res;
      // console.log(res);
    });
  }
}
