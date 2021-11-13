import { Component, Input, OnInit } from '@angular/core';
import { TracksModule } from '@core/models/tracks.model';
import { MultimediaService } from '../../services/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent implements OnInit {

  @Input() mode: 'small' | 'big' = 'small';
  @Input() track: TracksModule={_id:0, name: '', album: '', url: '', cover:'' };
  
  constructor(private asMultimediaService: MultimediaService) { }

  ngOnInit(): void {
  }

  sendPlay(track: TracksModule): void{
    //console.log('Enviando canción al reproductor.....', track);

    //this.asMultimediaService.callback.emit(track);
    this.asMultimediaService.trackInfo$.next(track)
  }

}
