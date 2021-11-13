import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  // dataTracksTrending$: Observable<TracksModule> = of([])
  // dataTracksRandom$: Observable<TracksModule> = of([])

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) {
    //   const {data}:any = (dataRaw as any).default;
    //   this.dataTracksTrending$ = of(data);
    //   this.dataTracksRandom$ = new Observable((observer) => {
    //     const trackExample: TracksModule = {
    //       _id:9,
    //       name: 'leve',
    //       album: 'Cartel de santa',
    //       url: 'https://',
    //       cover:'https://i.scdn.co/image/ab6761610000e5ebbd172041a059e4b6e46e2cfc'
    //     }
    //     setTimeout(() => {
    //       observer.next([trackExample])
    //     },5000)
    //   })
  }

  /* Método para obtener los tracks desde la API, declarada en
  el archivo de Enviroment */
  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      map(({ data }: any) => {
        return data;
      })
    );
  }

  /* Método para devolver tracks random*/
  getAllRandom$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      map(({ data }: any) => {
        return data.reverse();
      }),
      catchError((err) => {
        console.log('Revisar 🤢🤢🤢', err);
        return of([]);
      })
    );
  }
}
