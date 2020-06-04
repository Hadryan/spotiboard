import {
  REQUEST_TOP_TRACKS,
  RECEIVE_TOP_TRACKS,
  CLEAR_TRACKS,
  TopTracksState,
  TopTracksActionTypes,
} from './types';

const initialState: TopTracksState = {
  isFetching: false,
  data: null,
};

export default function TopTracksReducer(state = initialState, action: TopTracksActionTypes): TopTracksState {
  switch (action.type) {
    case REQUEST_TOP_TRACKS:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case RECEIVE_TOP_TRACKS:
      return {
        isFetching: action.isFetching,
        data: action.data,
      };
    case CLEAR_TRACKS:
      return {
        ...state,
        data: action.data,
      };
    default: return state;
  }
}
