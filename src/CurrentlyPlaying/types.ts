export interface CurrentlyPlayingState {
  isFetching: boolean;
  data: null | CurrentlyPlayingData;
}

export const REQUEST_CURRENTLY_PLAYING = 'REQUEST_CURRENTLY_PLAYING';
export const RECEIVE_CURRENTLY_PLAYING = 'RECEIVE_CURRENTLY_PLAYING';
export const NO_TRACK_CURRENTLY_PLAYING = 'NO_TRACK_CURRENTLY_PLAYING';
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';
export const REQUEST_PAUSE_PLAYBACK = 'REQUEST_PAUSE_PLAYBACK';
export const RECEIVE_PAUSE_PLAYBACK = 'RECEIVE_PAUSE_PLAYBACK';
export const REQUEST_RESUME_PLAYBACK = 'REQUEST_RESUME_PLAYBACK';
export const RECEIVE_RESUME_PLAYBACK = 'RECEIVE_RESUME_PLAYBACK';
export const CHANGE_LOCAL_IS_PLAYING = 'CHANGE_LOCAL_IS_PLAYING';
export const REQUEST_NEXT_PLAYBACK = 'REQUEST_NEXT_PLAYBACK';
export const RECEIVE_NEXT_PLAYBACK = 'RECEIVE_NEXT_PLAYBACK';
export const REQUEST_PREVIOUS_PLAYBACK = 'REQUEST_PREVIOUS_PLAYBACK';
export const RECEIVE_PREVIOUS_PLAYBACK = 'RECEIVE_PREVIOUS_PLAYBACK';
export const REQUEST_SHUFFLE = 'REQUEST_SHUFFLE';
export const RECEIVE_SHUFFLE = 'RECEIVE_SHUFFLE';
export const REQUEST_REPEAT = 'REQUEST_REPEAT';
export const RECEIVE_REPEAT = 'RECEIVE_REPEAT';
export const RATE_LIMITED = 'RATE_LIMITED';

interface RequestCurrentlyPlayingAction {
  type: typeof REQUEST_CURRENTLY_PLAYING;
  isFetching: boolean;
}

interface ReceiveCurrentlyPlayingAction {
  type: typeof RECEIVE_CURRENTLY_PLAYING;
  isFetching: boolean;
  data: CurrentlyPlayingData;
}

interface NoTrackCurrentlyPlayingAction {
  type: typeof NO_TRACK_CURRENTLY_PLAYING;
  isFetching: boolean;
  data: CurrentlyPlayingData | null;
}

interface UpdateProgressAction {
  type: typeof UPDATE_PROGRESS;
  progress_ms: number;
}

interface RequestPausePlaybackAction {
  type: typeof REQUEST_PAUSE_PLAYBACK;
  isFetching: boolean;
}

interface ReceivePausePlaybackAction {
  type: typeof RECEIVE_PAUSE_PLAYBACK;
  isFetching: boolean;
}

interface RequestResumePlaybackAction {
  type: typeof REQUEST_RESUME_PLAYBACK;
  isFetching: boolean;
}

interface ReceiveResumePlaybackAction {
  type: typeof RECEIVE_RESUME_PLAYBACK;
  isFetching: boolean;
}

interface ChangeLocalIsPlayingAction {
  type: typeof CHANGE_LOCAL_IS_PLAYING;
}

interface RequestNextPlaybackAction {
  type: typeof REQUEST_NEXT_PLAYBACK;
  isFetching: boolean;
}

interface ReceiveNextPlaybackAction {
  type: typeof RECEIVE_NEXT_PLAYBACK;
  isFetching: boolean;
}

interface RequestPreviousPlaybackAction {
  type: typeof REQUEST_PREVIOUS_PLAYBACK;
  isFetching: boolean;
}

interface ReceivePreviousPlaybackAction {
  type: typeof RECEIVE_PREVIOUS_PLAYBACK;
  isFetching: boolean;
}

interface RequestShuffleAction {
  type: typeof REQUEST_SHUFFLE;
  isFetching: boolean;
}

interface ReceiveShuffleAction {
  type: typeof RECEIVE_SHUFFLE;
  isFetching: boolean;
}

interface RequestRepeatAction {
  type: typeof REQUEST_REPEAT;
  isFetching: boolean;
}

interface ReceiveRepeatAction {
  type: typeof RECEIVE_REPEAT;
  isFetching: boolean;
}

interface RateLimitedAction {
  type: typeof RATE_LIMITED;
}

export interface CurrentlyPlayingData {
  timestamp: number;
  name: string;
  progress_ms: number;
  duration_ms: number;
  album_cover: AlbumArt[];
  artists: string[];
  is_playing: boolean;
  shuffle_state: boolean;
  repeat_state: string;
}

interface AlbumArt {
  height: number;
  url: string;
  width: number;
}

export type CurrentlyPlayingActionTypes = (
  RequestCurrentlyPlayingAction
  | ReceiveCurrentlyPlayingAction
  | NoTrackCurrentlyPlayingAction
  | UpdateProgressAction
  | RequestPausePlaybackAction
  | ReceivePausePlaybackAction
  | RequestResumePlaybackAction
  | ReceiveResumePlaybackAction
  | ChangeLocalIsPlayingAction
  | RequestNextPlaybackAction
  | ReceiveNextPlaybackAction
  | RequestPreviousPlaybackAction
  | ReceivePreviousPlaybackAction
  | RequestShuffleAction
  | ReceiveShuffleAction
  | RequestRepeatAction
  | ReceiveRepeatAction
  | RateLimitedAction
);
