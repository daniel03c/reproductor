import { Component, OnDestroy, OnInit } from '@angular/core';
import { TracksModule } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css'],
})
export class TracksPageComponent implements OnInit, OnDestroy {
  tracksTrending: Array<any> = [];
  tracksRamdom: Array<TracksModule> = [];

  listObservers$: Array<Subscription> = [];

  constructor(private trackService: TrackService) {}

  ngOnInit(): void {
    this.loaDataAll();
    this.loadDataRandom();

    // const {data}: any = (dataRaw as any).default
    // this.mockTracksList = data;
    // const observer$ = this.trackService.dataTracksTrending$
    // .subscribe((response: any): void => {
    //   this.tracksTrending = response
    //   this.tracksRamdom = response
    //   console.log('Canciones tranding 🕶 ', response);
    // })
    // const observer2$ = this.trackService.dataTracksRandom$
    // .subscribe((response: any): void => {
    //   this.tracksRamdom = [ ... this.tracksRamdom, ... response]
    //   console.log('Cancion random entrando 🕶 ', response);
    // })
    // this.listObservers$ = [observer$, observer2$]
  }

  loaDataAll(): void {
    this.trackService.getAllTracks$().subscribe((Response: TracksModule[]) => {
      this.tracksTrending = Response;
      //console.log('---> 🕶 🕶 🕶 ', Response);
    });
  }

  loadDataRandom(): void {
    this.trackService.getAllRandom$().subscribe((Response: TracksModule[]) => {
      this.tracksRamdom = Response;
      //console.log('---> 🕶 🕶 🕶 ', Response);
    });
  }

  ngOnDestroy(): void {
    // this.listObservers$.forEach((u) => u.unsubscribe());
  }
}
