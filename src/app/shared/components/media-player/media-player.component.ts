import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TracksModule } from '@core/models/tracks.model';
import { Subscription, Observable, Observer } from 'rxjs'; //Programación reactiva
import { MultimediaService } from '../../services/multimedia.service';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')

  //Objeto para maquetar los detalles de las canciones.
  mockCover!: TracksModule 

  listObservers$: Array<Subscription> = []
  state: string = 'paused'

  constructor(public asMultimediaService: MultimediaService) { }

  //Primer método de ciclo de vida Angular, solo después del constructor
  ngOnInit(): void {
    // const observer1$: Subscription = this.asMultimediaService.callback.subscribe(
    //   (response: TracksModule) => {
    //     console.log('Recibiendo canción...', response);
    //   }
    // )

    // this.listObservers$ = [observer1$]
    
    //Ejemplo de observable y observer
    /*const observable1$ = this.asMultimediaService.myObservable1$.subscribe((responseOk)=>{
      console.log('El agua llega perfecto!', responseOk);
    },(responseFail) => {
      console.log('😡 Se tapo la tuberia'); 
    })*/

    //Invocación para reproductor con observable
    /*this.asMultimediaService.trackInfo$.subscribe(res => {
      console.log("Debo reproducir esta canción... ", res)
      this.mockCover = res
    })*/

    const observer1$ = this.asMultimediaService.playerStatus$
      .subscribe(status => this.state = status)
    this.listObservers$ = [observer1$]
  }

  //último método de ciclo de vida Angular en ejecutarse antes de destruir el componente
  ngOnDestroy(): void{
    this.listObservers$.forEach(u => u.unsubscribe())
    console.log('💣💣💣💣 ZZZZZZZZZZ')
  }

  handlePosition(event: MouseEvent): void{
    const elNative: HTMLElement = this.progressBar.nativeElement
    const {clientX} = event
    const {x,width} = elNative.getBoundingClientRect()
    const clickX = clientX - x
    const percentageFromX = (clickX * 100) / width
    console.log(`Click(x): ${percentageFromX}`)
    this.asMultimediaService.seekAudio(percentageFromX)
  }

}
