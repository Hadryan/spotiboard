import { AppThunk } from '../../store/store';
import { config, urlHelper, getAccessToken } from '../../utils';
import {
  REQUEST_TOP_TRACKS,
  RECEIVE_TOP_TRACKS,
  CLEAR_TRACKS,
  REQUEST_RECOMMENDATION_TRACKS_PLAYLIST,
  RECEIVE_RECOMMENDATION_TRACKS_PLAYLIST,
  TopTracksActionTypes,
  TopTracksData,
} from './types';
import { logout } from '../../Auth/actions';

const requestTopTracks = (): TopTracksActionTypes => ({
  type: REQUEST_TOP_TRACKS,
  isFetching: true,
});

const receiveTopTracks = (data: TopTracksData[]): TopTracksActionTypes => ({
  type: RECEIVE_TOP_TRACKS,
  isFetching: false,
  data,
});

export const fetchTopTracks = (time_range: string): AppThunk => async (dispatch): Promise<TopTracksActionTypes> => {
  dispatch(requestTopTracks());
  const accessToken = getAccessToken();
  const url = urlHelper(
    config.API_URL + '/me/top/tracks',
    { limit: 50, time_range },
  );
  const headers = new Headers({
    Authorization: 'Bearer ' + accessToken,
  });
  const response = await fetch(url, { headers });
  if (response.status >= 400) {
    dispatch(logout());
  }
  const json = await response.json();
  const items: TopTracksData[] = json.items.map((item: any, index: number) => (
    {
      rank: index + 1,
      title: item.name,
      id: item.id,
      artists: item.artists.map((artist: any) => artist.name),
      album_name: item.album.name,
      album_pictures: item.album.images,
      is_local: item.is_local,
      url: item.external_urls.spotify,
      uri: item.uri,
    }
  ));
  return dispatch(receiveTopTracks(items));
};


export const clearTracks = (): TopTracksActionTypes => ({
  type: CLEAR_TRACKS,
  data: null,
});

const requestRecommendationTracksPlaylist = (): TopTracksActionTypes => ({
  type: REQUEST_RECOMMENDATION_TRACKS_PLAYLIST,
  isFetching: true,
});

const receiveRecommendationTracksPlaylist = (): TopTracksActionTypes => ({
  type: RECEIVE_RECOMMENDATION_TRACKS_PLAYLIST,
  isFetching: false,
});

export const createPlaylist = async (ids: string[], titles: string[], userId: string): Promise<boolean> => {
  const accessToken = getAccessToken();
  const contentType = 'application/json';
  // get recommended tracks
  const seed_tracks = ids.join(',');
  const tracksUrl = urlHelper(
    config.API_URL + '/recommendations',
    { seed_tracks },
  );
  const trackHeaders = new Headers({
    Authorization: 'Bearer ' + accessToken,
  });
  const tracksResponse = await fetch(tracksUrl, { headers: trackHeaders });
  if (tracksResponse.status >= 400) {
    logout();
    return false;
  }
  const tracksJson = await tracksResponse.json();
  const tracksUris = tracksJson.tracks.map((track: any) => track.uri);

  // create playlist
  const playlistUrl = config.API_URL + '/users/' + userId + '/playlists';
  const playlistHeaders = new Headers({
    Authorization: 'Bearer ' + accessToken,
    'Content-Type': contentType,
  });

  const playlistResponse = await fetch(playlistUrl, {
    method: 'POST',
    headers: playlistHeaders,
    body: JSON.stringify({ name: 'Recommendation Playlist from Tracks', description: 'Selected tracks: ' + titles.join(', ') }),
  });
  if (playlistResponse.status >= 400) {
    logout();
    return false;
  }
  const playlistJson = await playlistResponse.json();
  const playlistId = playlistJson.id;

  // add items to playlist
  const addUrl = config.API_URL + '/playlists/' + playlistId + '/tracks';
  const addHeaders = new Headers({
    Authorization: 'Bearer ' + accessToken,
    'Content-Type': contentType,
  });
  const uris = tracksUris;
  const addResponse = await fetch(addUrl, {
    method: 'POST',
    headers: addHeaders,
    body: JSON.stringify({ uris }),
  });
  if (addResponse.status >= 400) {
    logout();
    return false;
  }
  await addResponse.json();
  return true;
};

export const fetchRecommendationTracksPlaylist = (ids: string[], titles: string[], userId: string): AppThunk => async (dispatch): Promise<TopTracksActionTypes> => {
  dispatch(requestRecommendationTracksPlaylist());
  const response = await createPlaylist(ids, titles, userId);
  if (!response) {
    logout();
  }
  return dispatch(receiveRecommendationTracksPlaylist());
};
