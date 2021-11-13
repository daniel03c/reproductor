import { Component, Input, OnInit } from '@angular/core';
import { TracksModule } from '@core/models/tracks.model';

@Component({
  selector: 'app-section-generic',
  templateUrl: './section-generic.component.html',
  styleUrls: ['./section-generic.component.css']
})
export class SectionGenericComponent implements OnInit {

  @Input() title: string = ''
  
  //Definimos valor entre small o big y por inicio big para definir tamaño de ventana a mostrar
  @Input() mode: 'small' |'big' = 'big'

  @Input() dataTracks: Array<TracksModule> = []


  constructor() { }

  ngOnInit(): void {
  }

}
