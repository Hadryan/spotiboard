import { AppThunk } from '../../store/store';
import { config, urlHelper, getAccessToken } from '../../utils';
import {
  REQUEST_TOP_ARTISTS,
  RECEIVE_TOP_ARTISTS,
  CLEAR_ARTISTS,
  REQUEST_RECOMMENDATION_ARTISTS_PLAYLIST,
  RECEIVE_RECOMMENDATION_ARTISTS_PLAYLIST,
  TopArtistsActionTypes,
  TopArtistsData,
} from './types';
import { logout } from '../../Auth/actions';

const requestTopArtists = (): TopArtistsActionTypes => ({
  type: REQUEST_TOP_ARTISTS,
  isFetching: true,
});

const receiveTopArtists = (data: TopArtistsData[]): TopArtistsActionTypes => ({
  type: RECEIVE_TOP_ARTISTS,
  isFetching: false,
  data,
});

export const fetchTopArtists = (time_range: string): AppThunk => async (dispatch): Promise<TopArtistsActionTypes> => {
  dispatch(requestTopArtists());
  const accessToken = getAccessToken();
  const url = urlHelper(
    config.API_URL + '/me/top/artists',
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
  const items = json.items.map((item: any, index: number) => (
    {
      rank: index + 1,
      name: item.name,
      artist_pictures: item.images,
      genres: item.genres,
      url: item.external_urls.spotify,
      id: item.id,
      uri: item.uri,
    }
  ));
  return dispatch(receiveTopArtists(items));
};

export const clearArtists = (): TopArtistsActionTypes => ({
  type: CLEAR_ARTISTS,
  data: null,
});

const requestRecommendationArtistsPlaylist = (): TopArtistsActionTypes => ({
  type: REQUEST_RECOMMENDATION_ARTISTS_PLAYLIST,
  isFetching: true,
});

const receiveRecommendationArtistsPlaylist = (): TopArtistsActionTypes => ({
  type: RECEIVE_RECOMMENDATION_ARTISTS_PLAYLIST,
  isFetching: false,
});

export const createPlaylist = async (ids: string[], titles: string[], userId: string): Promise<boolean> => {
  const accessToken = getAccessToken();
  const contentType = 'application/json';
  // get recommended artists
  const seed_artists = ids.join(',');
  const tracksUrl = urlHelper(
    config.API_URL + '/recommendations',
    { seed_artists },
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
    body: JSON.stringify({ name: 'Recommendation Playlist from Artists', description: 'Selected artists: ' + titles.join(', ') }),
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

export const fetchRecommendationArtistsPlaylist = (ids: string[], names: string[], userId: string): AppThunk => async (dispatch): Promise<TopArtistsActionTypes> => {
  dispatch(requestRecommendationArtistsPlaylist());
  await createPlaylist(ids, names, userId);
  return dispatch(receiveRecommendationArtistsPlaylist());
};
