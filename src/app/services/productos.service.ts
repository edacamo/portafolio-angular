import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterfaceProductos } from '../interfaces/productos.interface';
import { timeout } from 'q';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
    // Bandera para indicar cuando carga los datos
    cargando = true;
    productos: InterfaceProductos [] = [] ;

  constructor( private http: HttpClient ) {

      this.cargarProductos();
   }

   private cargarProductos() {
      this.http.get('https://angular-html-850cb.firebaseio.com/productos_idx.json')
        .subscribe((res: InterfaceProductos []) => {
          this.productos = res;
          console.log(res);
          this.cargando = false;
          // setTimeout( () => {
          //   this.cargando = false;
          // }, 2000);
        });
   }
}
