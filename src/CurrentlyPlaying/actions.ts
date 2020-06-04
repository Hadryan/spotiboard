import { AppThunk } from '../store/store';
import { config, getAccessToken, urlHelper } from '../utils';
import {
  REQUEST_CURRENTLY_PLAYING,
  RECEIVE_CURRENTLY_PLAYING,
  NO_TRACK_CURRENTLY_PLAYING,
  UPDATE_PROGRESS,
  REQUEST_PAUSE_PLAYBACK,
  RECEIVE_PAUSE_PLAYBACK,
  REQUEST_RESUME_PLAYBACK,
  RECEIVE_RESUME_PLAYBACK,
  CHANGE_LOCAL_IS_PLAYING,
  REQUEST_NEXT_PLAYBACK,
  RECEIVE_NEXT_PLAYBACK,
  REQUEST_PREVIOUS_PLAYBACK,
  RECEIVE_PREVIOUS_PLAYBACK,
  REQUEST_SHUFFLE,
  RECEIVE_SHUFFLE,
  REQUEST_REPEAT,
  RECEIVE_REPEAT,
  RATE_LIMITED,
  CurrentlyPlayingActionTypes,
  CurrentlyPlayingData,

} from './types';
import { logout } from '../Auth/actions';


const rateLimited = (): CurrentlyPlayingActionTypes => ({
  type: RATE_LIMITED,
});

const requestCurrentlyPlaying = (): CurrentlyPlayingActionTypes => ({
  type: REQUEST_CURRENTLY_PLAYING,
  isFetching: true,
});

const receiveCurrentlyPlaying = (data: CurrentlyPlayingData): CurrentlyPlayingActionTypes => ({
  type: RECEIVE_CURRENTLY_PLAYING,
  isFetching: false,
  data,
});

const noTrackCurrentlyPlaying = (): CurrentlyPlayingActionTypes => ({
  type: NO_TRACK_CURRENTLY_PLAYING,
  isFetching: false,
  data: null,
});

export const fetchCurrentlyPlaying = (): AppThunk => async (dispatch): Promise<CurrentlyPlayingActionTypes> => {
  dispatch(requestCurrentlyPlaying());
  const accessToken = getAccessToken();
  const url = config.API_URL + '/me/player';
  const headers = new Headers({
    Authorization: 'Bearer ' + accessToken,
  });
  const response = await fetch(url, { headers });
  if (response.status === 429) {
    return dispatch(rateLimited());
  }
  if (response.status >= 401) {
    dispatch(logout());
  }
  if (response.status === 204) {
    return dispatch(noTrackCurrentlyPlaying());
  }
  const json = await response.json();
  if (!json.item) {
    return dispatch(noTrackCurrentlyPlaying());
  }
  const modifiedJson = {
    timestamp: json.timestamp,
    name: json.item.name,
    progress_ms: json.progress_ms,
    duration_ms: json.item.duration_ms,
    album_cover: json.item.album.images,
    artists: json.item.album.artists.map((entry: Record<string, string | number | boolean>) => entry.name),
    is_playing: json.is_playing,
    shuffle_state: json.shuffle_state,
    repeat_state: json.repeat_state,
  };
  return dispatch(receiveCurrentlyPlaying(modifiedJson));
};

export const updateProgress = (progress_ms: number): CurrentlyPlayingActionTypes => ({
  type: UPDATE_PROGRESS,
  progress_ms,
});

const requestPausePlayback = (): CurrentlyPlayingActionTypes => ({
  type: REQUEST_PAUSE_PLAYBACK,
  isFetching: true,
});

const receivePausePlayback = (): CurrentlyPlayingActionTypes => ({
  type: RECEIVE_PAUSE_PLAYBACK,
  isFetching: false,
});

const changeLocalIsPlaying = (): CurrentlyPlayingActionTypes => ({
  type: CHANGE_LOCAL_IS_PLAYING,
});


export const fetchPausePlayback = (): AppThunk => async (dispatch): Promise<CurrentlyPlayingActionTypes> => {
  dispatch(requestPausePlayback);
  const accessToken = getAccessToken();
  const url = config.API_URL + '/me/player/pause';
  const headers = new Headers({
    Authorization: 'Bearer ' + accessToken,
  });
  const response = await fetch(url, { headers, method: 'PUT' });
  if (response.status === 429) {
    return dispatch(rateLimited());
  }
  if (response.status === 403 || response.status === 404) {
    dispatch(fetchCurrentlyPlaying());
  } else if (response.status === 401) {
    dispatch(logout());
  }
  dispatch(changeLocalIsPlaying());
  return dispatch(receivePausePlayback());
};

const requestResumePlayback = (): CurrentlyPlayingActionTypes => ({
  type: REQUEST_RESUME_PLAYBACK,
  isFetching: true,
});

const receiveResumePlayback = (): CurrentlyPlayingActionTypes => ({
  type: RECEIVE_RESUME_PLAYBACK,
  isFetching: false,
});


export const fetchResumePlayback = (): AppThunk => async (dispatch): Promise<CurrentlyPlayingActionTypes> => {
  dispatch(requestResumePlayback);
  const accessToken = getAccessToken();
  const url = config.API_URL + '/me/player/play';
  const headers = new Headers({
    Authorization: 'Bearer ' + accessToken,
  });
  const response = await fetch(url, { headers, method: 'PUT' });
  if (response.status === 429) {
    return dispatch(rateLimited());
  }
  if (response.status === 403) {
    dispatch(fetchCurrentlyPlaying());
  } else if (response.status === 401) {
    dispatch(logout());
  }
  dispatch(fetchCurrentlyPlaying());
  return dispatch(receiveResumePlayback());
};

const requestNextPlayback = (): CurrentlyPlayingActionTypes => ({
  type: REQUEST_NEXT_PLAYBACK,
  isFetching: true,
});

const receiveNextPlayback = (): CurrentlyPlayingActionTypes => ({
  type: RECEIVE_NEXT_PLAYBACK,
  isFetching: false,
});

export const fetchNextPlayback = (): AppThunk => async (dispatch): Promise<CurrentlyPlayingActionTypes> => {
  dispatch(requestNextPlayback);
  const accessToken = getAccessToken();
  const url = config.API_URL + '/me/player/next';
  const headers = new Headers({
    Authorization: 'Bearer ' + accessToken,
  });
  const response = await fetch(url, { headers, method: 'POST' });
  if (response.status === 429) {
    return dispatch(rateLimited());
  }
  if (response.status === 401 || response.status === 404) {
    dispatch(logout());
  }
  setTimeout(() => {
    dispatch(fetchCurrentlyPlaying());
  }, 250);
  return dispatch(receiveNextPlayback());
};

const requestPreviousPlayback = (): CurrentlyPlayingActionTypes => ({
  type: REQUEST_PREVIOUS_PLAYBACK,
  isFetching: true,
});

const receivePreviousPlayback = (): CurrentlyPlayingActionTypes => ({
  type: RECEIVE_PREVIOUS_PLAYBACK,
  isFetching: false,
});

export const fetchPreviousPlayback = (): AppThunk => async (dispatch): Promise<CurrentlyPlayingActionTypes> => {
  dispatch(requestPreviousPlayback);
  const accessToken = getAccessToken();
  const url = config.API_URL + '/me/player/previous';
  const headers = new Headers({
    Authorization: 'Bearer ' + accessToken,
  });
  const response = await fetch(url, { headers, method: 'POST' });
  if (response.status === 429) {
    return dispatch(rateLimited());
  }
  if (response.status === 403) {
    dispatch(fetchCurrentlyPlaying());
  } else if (response.status === 401) {
    dispatch(logout());
  }
  dispatch(fetchCurrentlyPlaying());
  return dispatch(receivePreviousPlayback());
};

const requestRepeat = (): CurrentlyPlayingActionTypes => ({
  type: REQUEST_REPEAT,
  isFetching: true,
});

const receiveRepeat = (): CurrentlyPlayingActionTypes => ({
  type: RECEIVE_REPEAT,
  isFetching: false,
});

export const fetchRepeat = (repeatType: string): AppThunk => async (dispatch): Promise<CurrentlyPlayingActionTypes> => {
  dispatch(requestRepeat());
  const dict: Record<string, string> = {
    'off': 'context',
    'track': 'off',
    'context': 'track',
  };
  const nextRepeatType = dict[repeatType];
  const query = { state: nextRepeatType };
  const accessToken = getAccessToken();
  const url = config.API_URL + '/me/player/repeat';
  const headers = new Headers({
    Authorization: 'Bearer ' + accessToken,
  });
  const response = await fetch(urlHelper(url, query), { headers, method: 'PUT' });
  if (response.status === 429) {
    return dispatch(rateLimited());
  }
  if (response.status === 403) {
    dispatch(fetchCurrentlyPlaying());
  } else if (response.status === 401) {
    dispatch(logout());
  }
  dispatch(fetchCurrentlyPlaying());
  return dispatch(receiveRepeat());
};

const requestShuffle = (): CurrentlyPlayingActionTypes => ({
  type: REQUEST_SHUFFLE,
  isFetching: true,
});

const receiveShuffle = (): CurrentlyPlayingActionTypes => ({
  type: RECEIVE_SHUFFLE,
  isFetching: false,
});

export const fetchShuffle = (shuffleState: boolean): AppThunk => async (dispatch): Promise<CurrentlyPlayingActionTypes> => {
  dispatch(requestShuffle());
  const query = { state: !shuffleState };
  const accessToken = getAccessToken();
  const url = config.API_URL + '/me/player/shuffle';
  const headers = new Headers({
    Authorization: 'Bearer ' + accessToken,
  });
  const response = await fetch(urlHelper(url, query), { headers, method: 'PUT' });
  if (response.status === 429) {
    return dispatch(rateLimited());
  }
  if (response.status === 403) {
    dispatch(fetchCurrentlyPlaying());
  } else if (response.status === 401) {
    dispatch(logout());
  }
  dispatch(fetchCurrentlyPlaying());
  return dispatch(receiveShuffle());
};
