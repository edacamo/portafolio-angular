import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoDescripcionInterface } from 'src/app/interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcionInterface;
  productoID: string;

  constructor( private route: ActivatedRoute,
               public productoSerive: ProductosService ) { }

  ngOnInit() {
    this.route.params
      .subscribe( parametros => {
        // console.log(parametros['productoID']);

        this.productoSerive.getProducto(parametros['productoID'])
        .subscribe( (producto: ProductoDescripcionInterface ) => {
        this.productoID = parametros['productoID'];
        this.producto = producto;
        // console.log(producto);
          });
      });
  }
}
