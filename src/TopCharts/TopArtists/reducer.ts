import {
  REQUEST_TOP_ARTISTS,
  RECEIVE_TOP_ARTISTS,
  TopArtistsState,
  TopArtistsActionTypes,
} from './types';

const initialState: TopArtistsState = {
  isFetching: false,
  data: null,
};

export default function TopArtistsReducer(state = initialState, action: TopArtistsActionTypes): TopArtistsState {
  switch (action.type) {
    case REQUEST_TOP_ARTISTS:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case RECEIVE_TOP_ARTISTS:
      return {
        isFetching: action.isFetching,
        data: action.data,
      };
    default: return state;
  }
}
