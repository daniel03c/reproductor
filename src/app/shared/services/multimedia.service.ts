import { TracksModule } from '../../core/models/tracks.model';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  //Declarar un observable
  /*myObservable1$: Subject<any> = new Subject();*/

  //BehaivorSubject, se debe de inicializar
  myObservable1$: BehaviorSubject<any> = new BehaviorSubject('💧')

  //Variables a usar en el reproductor
  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public audio!: HTMLAudioElement
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('Paused')
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor() {
    //Declaración de un observable
    /* this.myObservable1$ = new Observable((observer: Observer<any>) => {
      observer.next('💧')
      
      setTimeout(()=> {
        observer.complete()
      }, 2500)

      setTimeout(()=> {
        observer.next('💧')
      }, 2500)

      setTimeout(()=> {
        observer.error('😡')
      }, 5000)
    })*/


    //Un subject es un observable y un observer a la vez
    /*setTimeout(()=> {
      this.myObservable1$.next('💧💧💧')
    }, 1000)

    setTimeout(()=> {
      this.myObservable1$.error('😡')
    }, 3000)*/


    //BehaivorSubject también es un observable y observer
    setTimeout(()=> {
      this.myObservable1$.next('💧💧💧')
    }, 1000)

    setTimeout(()=> {
      this.myObservable1$.error('😡')
    }, 3000)
   

    //Invocación de la función del reproductor
    this.audio = new Audio()
    this.trackInfo$.subscribe(responseOk => {
      if(responseOk){
        this.setAudio(responseOk)
      }
    })

    //Invocación de funciones del reproductor
    this.listenAllEvents()
  }


  //Función para iniciar el reproductor
  public setAudio(track: TracksModule): void {
    console.log('Info track desde el servicio... ', track)
    this.audio.src = track.url
    this.audio.play()
  }

  //Función para obtener tiempo de reproducción
  private listenAllEvents(): void{
    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('play', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('ended', this.setPlayerStatus, false)
  }

  //Funcion para obtener tiempo de canción
  private calculateTime = () =>  {
    //console.log('Disparando evento')
    const {duration, currentTime} = this.audio
    this.setTimeElapsed(currentTime)
    this.setTimeRemaining(currentTime, duration)
    //console.table([duration, currentTime])
    this.setPercentage(currentTime,duration)
  }

  //Funcion tiempo transcurrido
  private setTimeElapsed(currentTime: number): void{
    let seconds = Math.floor(currentTime % 60); 
    let minutes = Math.floor((currentTime / 60) % 60 );

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes

    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)
  }

  //Función tiempo restante
  private setTimeRemaining(currentTime: number, duration: number){
    let timeLeft = duration - currentTime
    let seconds = Math.floor(timeLeft % 60); 
    let minutes = Math.floor((timeLeft / 60) % 60 );
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes

    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
  }

  //Función para botón de reproducción
  private setPlayerStatus = (state: any) => {
    //console.log('===>', state)
    switch(state.type){
      case 'play':
        this.playerStatus$.next('play')
        break;
      case 'playing':
        this.playerStatus$.next('playing')
        break;
      case 'ended':
        this.playerStatus$.next('ended')
        break;
      default:
        this.playerStatus$.next('paused')
        break;
    }
  }

  //Función para pause de reproducción
  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }

  //Function para el porcentaje de reproducción
  private setPercentage(currentTime: number, duration: number): void{
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage)
  }

  //Función con el porcentaje de reproducción
  public seekAudio(percentage: number): void{
    const {duration} = this.audio
    //console.log(`Duration: ${duration}, Percentage: ${percentage}`)
    const percentageToSecond = (percentage * duration ) / 100
    //console.log(percentageToSecond)
    this.audio.currentTime = percentageToSecond
  }
}
