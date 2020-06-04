export interface TopArtistsState {
  isFetching: boolean;
  data: null | TopArtistsData[];
}

export const REQUEST_TOP_ARTISTS = 'REQUEST_TOP_ARTISTS';
export const RECEIVE_TOP_ARTISTS = 'RECEIVE_TOP_ARTISTS';
export const CLEAR_ARTISTS = 'CLEAR_ARTISTS';
export const REQUEST_RECOMMENDATION_ARTISTS_PLAYLIST = 'REQUEST_RECOMMENDATION_ARTISTS_PLAYLIST';
export const RECEIVE_RECOMMENDATION_ARTISTS_PLAYLIST = 'RECEIVE_RECOMMENDATION_ARTISTS_PLAYLIST';

interface RequestTopArtistsAction {
  type: typeof REQUEST_TOP_ARTISTS;
  isFetching: boolean;
}

interface ReceiveTopArtistsAction {
  type: typeof RECEIVE_TOP_ARTISTS;
  isFetching: boolean;
  data: TopArtistsData[];
}

interface ClearArtistsAction {
  type: typeof CLEAR_ARTISTS;
  data: null;
}

interface RequestRecommendationArtistsPlaylistAction {
  type: typeof REQUEST_RECOMMENDATION_ARTISTS_PLAYLIST;
  isFetching: boolean;
}

interface ReceiveRecommendationArtistsPlaylistAction {
  type: typeof RECEIVE_RECOMMENDATION_ARTISTS_PLAYLIST;
  isFetching: boolean;
}

export interface TopArtistsData {
  rank: number;
  name: string;
  artist_pictures: AlbumArt[];
  genres: string[];
  url: string;
  uri: string;
  id: string;
}

interface AlbumArt {
  height: number;
  url: string;
  width: number;
}

export type TopArtistsActionTypes =
RequestTopArtistsAction
| ReceiveTopArtistsAction
| ClearArtistsAction
| RequestRecommendationArtistsPlaylistAction
| ReceiveRecommendationArtistsPlaylistAction;
