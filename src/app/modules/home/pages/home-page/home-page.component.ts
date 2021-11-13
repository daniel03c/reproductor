import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',  //Lo que se utiliza para llamar a un apartado html
  templateUrl: './home-page.component.html',  //Html asociado al componente
  styleUrls: ['./home-page.component.css']  //url que contine los estilos que solo afectan el componente
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
