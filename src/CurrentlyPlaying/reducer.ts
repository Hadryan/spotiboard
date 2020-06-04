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
  CurrentlyPlayingState,
  CurrentlyPlayingActionTypes,
} from './types';

const initialState: CurrentlyPlayingState = {
  isFetching: false,
  data: null,
};

export default function CurrentlyPlayingReducer(state = initialState, action: CurrentlyPlayingActionTypes): CurrentlyPlayingState {
  switch (action.type) {
    case REQUEST_CURRENTLY_PLAYING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case RECEIVE_CURRENTLY_PLAYING:
      return {
        isFetching: action.isFetching,
        data: action.data,
      };
    case NO_TRACK_CURRENTLY_PLAYING:
      return {
        isFetching: action.isFetching,
        data: action.data,
      };
    case UPDATE_PROGRESS:
      if (!state.data) {
        return state;
      }
      return {
        ...state,
        data: {
          ...state.data,
          progress_ms: action.progress_ms,
        },
      };
    case REQUEST_PAUSE_PLAYBACK:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case RECEIVE_PAUSE_PLAYBACK:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case REQUEST_RESUME_PLAYBACK:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case RECEIVE_RESUME_PLAYBACK:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case CHANGE_LOCAL_IS_PLAYING:
      if (!state.data) {
        return state;
      }
      return {
        ...state,
        data: {
          ...state.data,
          is_playing: !state.data.is_playing,
        },
      };

    default: return state;
  }
}
