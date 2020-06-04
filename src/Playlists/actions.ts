import { AppThunk } from '../store/store';
import { config, getAccessToken, urlHelper } from '../utils';
import {
  REQUEST_PLAYLISTS,
  RECEIVE_PLAYLISTS,
  SET_CURRENT_PLAYLIST,
  PlaylistData,
  PlaylistsActionTypes,
} from './types';
import { logout } from '../Auth/actions';

const requestPlaylists = (): PlaylistsActionTypes => ({
  type: REQUEST_PLAYLISTS,
  isFetching: true,
});

const receivePlaylists = (data: any): PlaylistsActionTypes => ({
  type: RECEIVE_PLAYLISTS,
  isFetching: false,
  data,
});

export const fetchPlaylists = (): AppThunk => async (dispatch): Promise<PlaylistsActionTypes> => {
  dispatch(requestPlaylists());
  const accessToken = getAccessToken();
  const url = urlHelper(
    config.API_URL + '/me/playlists',
    { limit: 50 },
  );
  const headers = new Headers({
    Authorization: 'Bearer ' + accessToken,
  });
  const response = await fetch(url, { headers });
  if (response.status >= 401) {
    dispatch(logout());
  }
  const json = await response.json();
  const modifiedJson: PlaylistData[] = json.items.map((playlist: any) => ({
    name: playlist.name,
    id: playlist.id,
    images: playlist.images,
    uri: playlist.uri,
    tracksUrl: playlist.tracks.href,
    tracksNumber: playlist.tracks.total,
  }));
  return dispatch(receivePlaylists(modifiedJson));
};

export const setCurrentPlaylist = (currentPlaylistId: string, currentPlaylistName: string, currentPlaylistImgUrl: string): PlaylistsActionTypes => ({
  type: SET_CURRENT_PLAYLIST,
  currentPlaylistId,
  currentPlaylistName,
  currentPlaylistImgUrl,
});
