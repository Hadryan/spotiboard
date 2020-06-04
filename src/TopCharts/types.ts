export interface TopTracksState {
  isFetching: boolean;
  data: any;
}

export const REQUEST_TOP_TRACKS = 'REQUEST_TOP_TRACKS';
export const RECEIVE_TOP_TRACKS = 'RECEIVE_TOP_TRACKS';

interface RequestTopTracksAction {
  type: typeof REQUEST_TOP_TRACKS;
  isFetching: boolean;
}

interface ReceiveTopTracksAction {
  type: typeof RECEIVE_TOP_TRACKS;
  isFetching: boolean;
  data: any;
}

export type TopTracksActionTypes = RequestTopTracksAction | ReceiveTopTracksAction;
