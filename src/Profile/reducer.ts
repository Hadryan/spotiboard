import {
  REQUEST_PROFILE,
  RECEIVE_PROFILE,
  ProfileState,
  ProfileActionTypes,
  INITIAL_LOAD,
} from './types';

const initialState: ProfileState = {
  isFetching: false,
  data: null,
  initialLoad: false,
};

export default function CurrentlyPlayingReducer(state = initialState, action: ProfileActionTypes): ProfileState {
  switch (action.type) {
    case REQUEST_PROFILE:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_PROFILE:
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    case INITIAL_LOAD:
      return {
        ...state,
        initialLoad: action.initialLoad,
      };
    default: return state;
  }
}
