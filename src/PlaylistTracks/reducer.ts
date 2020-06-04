import {
  REQUEST_PLAYLIST_TRACKS,
  RECEIVE_PLAYLIST_TRACKS,
  REQUEST_TRACKS_ANALYSIS,
  RECEIVE_TRACKS_ANALYSIS,
  CLEAR_STATE,
  PlaylistTracksState,
  PlaylistTracksActionTypes,
} from './types';

const initialState: PlaylistTracksState = {
  isFetching: false,
  tracks: null,
  analysis: null,
};

export default function PlaylistTracksReducer(state = initialState, action: PlaylistTracksActionTypes): PlaylistTracksState {
  switch (action.type) {
    case REQUEST_PLAYLIST_TRACKS:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case RECEIVE_PLAYLIST_TRACKS:
      return {
        ...state,
        tracks: action.tracks,
      };
    case REQUEST_TRACKS_ANALYSIS:
      return {
        ...state,
      };
    case RECEIVE_TRACKS_ANALYSIS:
      return {
        ...state,
        isFetching: action.isFetching,
        analysis: action.analysis,
      };
    case CLEAR_STATE:
      return {
        ...state,
        tracks: null,
        analysis: null,
      };
    default: return state;
  }
}
