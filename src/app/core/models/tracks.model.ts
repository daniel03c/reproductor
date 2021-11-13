import { ArtistModel } from "./artist.model";

export interface TracksModule {
    name: string;
    album: string;
    cover: string;
    url: string;
    _id: string | number;
    artist?: ArtistModel;
}