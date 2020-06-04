export interface PlaylistTracksState {
  isFetching: boolean;
  tracks: any;
  analysis: any;
}

export const REQUEST_PLAYLIST_TRACKS = 'REQUEST_PLAYLIST_TRACKS';
export const RECEIVE_PLAYLIST_TRACKS = 'RECEIVE_PLAYLIST_TRACKS';
export const REQUEST_TRACKS_ANALYSIS = 'REQUEST_TRACKS_ANALYSIS';
export const RECEIVE_TRACKS_ANALYSIS = 'RECEIVE_TRACKS_ANALYSIS';
export const CLEAR_STATE = 'CLEAR_STATE';

interface RequestPlaylistTracksAction {
  type: typeof REQUEST_PLAYLIST_TRACKS;
  isFetching: boolean;
}

interface ReceivePlaylistTracksAction {
  type: typeof RECEIVE_PLAYLIST_TRACKS;
  tracks: Record<string, any>;
}

interface RequestTracksAnalysisAction {
  type: typeof REQUEST_TRACKS_ANALYSIS;
}

interface ReceiveTracksAnalysisAction {
  type: typeof RECEIVE_TRACKS_ANALYSIS;
  isFetching: boolean;
  analysis: any;
}

interface ClearStateAction {
  type: typeof CLEAR_STATE;
}

export type PlaylistTracksActionTypes = (
  RequestPlaylistTracksAction
  | ReceivePlaylistTracksAction
  | RequestTracksAnalysisAction
  | ReceiveTracksAnalysisAction
  | ClearStateAction
);
