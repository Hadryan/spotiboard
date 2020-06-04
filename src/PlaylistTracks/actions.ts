/* eslint-disable prefer-destructuring */
import { AppThunk } from '../store/store';
import { config, getAccessToken, urlHelper } from '../utils';
import {
  REQUEST_PLAYLIST_TRACKS,
  RECEIVE_PLAYLIST_TRACKS,
  REQUEST_TRACKS_ANALYSIS,
  RECEIVE_TRACKS_ANALYSIS,
  CLEAR_STATE,
  PlaylistTracksActionTypes,
} from './types';
import { logout } from '../Auth/actions';

const requestPlaylistTracks = (): PlaylistTracksActionTypes => ({
  type: REQUEST_PLAYLIST_TRACKS,
  isFetching: true,
});

const receivePlaylistTracks = (tracks: Record<string, any>): PlaylistTracksActionTypes => ({
  type: RECEIVE_PLAYLIST_TRACKS,
  tracks,
});

const requestTracksAnalysis = (): PlaylistTracksActionTypes => ({
  type: REQUEST_TRACKS_ANALYSIS,
});

const receiveTracksAnalysis = (analysis: any): PlaylistTracksActionTypes => ({
  type: RECEIVE_TRACKS_ANALYSIS,
  isFetching: false,
  analysis,
});

export const clearState = (): PlaylistTracksActionTypes => ({
  type: CLEAR_STATE,
});

export const fetchTracksAnalysis = (playlistId: string): AppThunk => async (dispatch): Promise<PlaylistTracksActionTypes> => {
  dispatch(requestPlaylistTracks());
  const accessToken = getAccessToken();
  // get playlist tracks
  const playlistTracksUrl = config.API_URL + `/playlists/${playlistId}/tracks`;
  const playlistTracksHeaders = new Headers({
    Authorization: 'Bearer ' + accessToken,
  });
  const playlistTracksResponse = await fetch(playlistTracksUrl, { headers: playlistTracksHeaders });
  if (playlistTracksResponse.status >= 400) {
    logout();
  }

  const playlistTracksJson = await playlistTracksResponse.json();
  const tracks: Record<string, any> = playlistTracksJson.items.map((item: any) => ({
    name: item.track.name,
    id: item.track.id,
    is_local: item.is_local,
    artists: item.track.artists.map((artist: any) => artist.name),
    album_pictures: item.track.album.images,
  }));
  dispatch(receivePlaylistTracks(tracks));
  // get tracks analysis
  dispatch(requestTracksAnalysis());
  const analysisUrl = config.API_URL + '/audio-features';
  const analysisHeaders = new Headers({
    Authorization: 'Bearer ' + accessToken,
  });
  const trackIdsArr = playlistTracksJson.items.map((item: any) => item.track.id);
  const analysisQuery = { ids: trackIdsArr.join(',') };
  const analysisResponse = await fetch(urlHelper(analysisUrl, analysisQuery), {
    headers: analysisHeaders,
  });
  if (analysisResponse.status >= 400) logout();
  const analysisJson = await analysisResponse.json();

  const danceability = analysisJson.audio_features.reduce((acc: number, c: any) => acc + c.danceability, 0);
  const energy = analysisJson.audio_features.reduce((acc: number, c: any) => acc + c.energy, 0);
  const loudness = analysisJson.audio_features.reduce((acc: number, c: any) => acc + c.loudness, 0);
  const valence = analysisJson.audio_features.reduce((acc: number, c: any) => acc + c.valence, 0);
  const acousticness = analysisJson.audio_features.reduce((acc: number, c: any) => acc + c.acousticness, 0);
  const speechiness = analysisJson.audio_features.reduce((acc: number, c: any) => acc + c.speechiness, 0);
  const length = analysisJson.audio_features.length;
  const analysis = {
    danceability: (danceability / length).toFixed(2),
    energy: (energy / length).toFixed(2),
    loudness: (loudness / length).toFixed(2),
    valence: (valence / length).toFixed(2),
    speechiness: (speechiness / length).toFixed(2),
    acousticness: (acousticness / length).toFixed(2),
  };

  return dispatch(receiveTracksAnalysis(analysis));
};
