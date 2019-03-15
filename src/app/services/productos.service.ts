import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterfaceProductos } from '../interfaces/productos.interface';
import { timeout, reject } from 'q';
import { resolve } from 'url';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
    // Bandera para indicar cuando carga los datos
    cargando = true;
    productos: InterfaceProductos [] = [] ;
    productosFiltrado: InterfaceProductos [] = [];
  constructor( private http: HttpClient ) {

      this.cargarProductos();
   }

   private cargarProductos() {
      return new Promise (( resolve, reject) => {
        this.http.get('https://angular-html-850cb.firebaseio.com/productos_idx.json')
        .subscribe((res: InterfaceProductos []) => {
          this.productos = res;
          // console.log(res);
          this.cargando = false;
          // setTimeout( () => {
          //   this.cargando = false;
          // }, 2000);
          resolve();
        });
      });
   }

   getProducto( id: string ) {
      // Retorna la definicion del Observable (id del producto seleccionado)
      return  this.http.get(`https://angular-html-850cb.firebaseio.com/productos/${ id }.json`);

   }

   buscarProducto(termino: string) {
     if (this.productos.length === 0) {
        // cargar productos
        this.cargarProductos().then( () => {
          // Ejecutar despues de tener los productos
          // Aplicar filtro
          this.filtrarProductos(termino);
        });
     } else {
        // aplicar el filtro
        this.filtrarProductos(termino);
     }
   }

   private filtrarProductos( termino: string ) {
      // console.log(this.productos);
      // Purgamos el arreglo
      this.productosFiltrado = [];
      termino = termino.toLocaleLowerCase();

      // cargamos el arreglo ProductosFiltrado en base a la consulta del Usuario
      this.productos.forEach( pro => {
        const tituloLower = pro.titulo.toLocaleLowerCase();

        if (pro.categoria.indexOf ( termino ) >= 0 || tituloLower.indexOf ( termino ) >= 0) {
          this.productosFiltrado.push (pro);
        }
      });
   }
}
