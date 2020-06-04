export interface PlaylistsState {
  isFetching: boolean;
  data: PlaylistData[] | null;
  currentPlaylistId: string | null;
  currentPlaylistName: string | null;
  currentPlaylistImgUrl: string | undefined;
}

export const REQUEST_PLAYLISTS = 'REQUEST_PLAYLISTS';
export const RECEIVE_PLAYLISTS = 'RECEIVE_PLAYLISTS';
export const SET_CURRENT_PLAYLIST = 'SET_CURRENT_PLAYLIST';

interface RequestPlaylistsAction {
  type: typeof REQUEST_PLAYLISTS;
  isFetching: boolean;
}

interface ReceivePlaylistsAction {
  type: typeof RECEIVE_PLAYLISTS;
  isFetching: boolean;
  data: any;
}

interface SetCurrentPlaylistAction {
  type: typeof SET_CURRENT_PLAYLIST;
  currentPlaylistId: string;
  currentPlaylistName: string;
  currentPlaylistImgUrl: string;
}

export interface PlaylistData {
  name: string;
  id: string;
  images: any[];
  uri: string;
  tracksUrl: string;
  tracksNumber: number;
}

export type PlaylistsActionTypes = RequestPlaylistsAction | ReceivePlaylistsAction | SetCurrentPlaylistAction;
