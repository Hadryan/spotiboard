export interface TopTracksState {
  isFetching: boolean;
  data: null | TopTracksData[];
}

export const REQUEST_TOP_TRACKS = 'REQUEST_TOP_TRACKS';
export const RECEIVE_TOP_TRACKS = 'RECEIVE_TOP_TRACKS';
export const CLEAR_TRACKS = 'CLEAR_TRACKS';
export const REQUEST_RECOMMENDATION_TRACKS_PLAYLIST = 'REQUEST_RECOMMENDATION_TRACKS_PLAYLIST';
export const RECEIVE_RECOMMENDATION_TRACKS_PLAYLIST = 'RECEIVE_RECOMMENDATION_TRACKS_PLAYLIST';

interface RequestTopTracksAction {
  type: typeof REQUEST_TOP_TRACKS;
  isFetching: boolean;
}

interface ReceiveTopTracksAction {
  type: typeof RECEIVE_TOP_TRACKS;
  isFetching: boolean;
  data: TopTracksData[];
}

interface ClearTracksAction {
  type: typeof CLEAR_TRACKS;
  data: null;
}

interface RequestRecommendationTracksPlaylistAction {
  type: typeof REQUEST_RECOMMENDATION_TRACKS_PLAYLIST;
  isFetching: boolean;
}

interface ReceiveRecommendationTracksPlaylistAction {
  type: typeof RECEIVE_RECOMMENDATION_TRACKS_PLAYLIST;
  isFetching: boolean;
}

export interface TopTracksData {
  rank: number;
  id: string;
  title: string;
  artists: string[];
  album_name: string;
  album_pictures: AlbumArt[];
  is_local: boolean;
  url: string;
  uri: string;
}

interface AlbumArt {
  height: number;
  url: string;
  width: number;
}

export type TopTracksActionTypes =
  RequestTopTracksAction
  | ReceiveTopTracksAction
  | ClearTracksAction
  | RequestRecommendationTracksPlaylistAction
  | ReceiveRecommendationTracksPlaylistAction;
