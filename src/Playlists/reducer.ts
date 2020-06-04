import {
  REQUEST_PLAYLISTS,
  RECEIVE_PLAYLISTS,
  SET_CURRENT_PLAYLIST,
  PlaylistsState,
  PlaylistsActionTypes,
} from './types';

const initialState: PlaylistsState = {
  isFetching: false,
  data: null,
  currentPlaylistId: null,
  currentPlaylistName: null,
  currentPlaylistImgUrl: undefined,
};

export default function PlaylistsReducer(state = initialState, action: PlaylistsActionTypes): PlaylistsState {
  switch (action.type) {
    case REQUEST_PLAYLISTS:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case RECEIVE_PLAYLISTS:
      return {
        ...state,
        isFetching: action.isFetching,
        data: action.data,
      };
    case SET_CURRENT_PLAYLIST:
      return {
        ...state,
        currentPlaylistId: action.currentPlaylistId,
        currentPlaylistName: action.currentPlaylistName,
        currentPlaylistImgUrl: action.currentPlaylistImgUrl,
      };
    default: return state;
  }
}
