import { Component, OnInit } from '@angular/core';
import { InfoPageService } from 'src/app/services/info-page.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // private router: Router =>Navegacion interna del componente para buscar
  // tslint:disable-next-line:variable-name
  constructor( public _service: InfoPageService,
               private router: Router ) {}

  ngOnInit() {
  }

  buscarProducto(termino: string) {
    if (termino.length < 1) {
      return;
    }
    this.router.navigate(['/search', termino]); // Navegacion a la pagina search con el texto introducido en input BUSCAR
    // console.log(termino);
  }
}
