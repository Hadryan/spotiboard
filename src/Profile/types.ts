export interface ProfileState {
  isFetching: boolean;
  data: ProfileData | null;
  initialLoad: boolean;
}


export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const INITIAL_LOAD = 'INITIAL_LOAD';

interface RequestProfileAction {
  type: typeof REQUEST_PROFILE;
  isFetching: boolean;
}

interface ReceiveProfileAction {
  type: typeof RECEIVE_PROFILE;
  isFetching: boolean;
  data: ProfileData;
}

interface InitialLoadAction {
  type: typeof INITIAL_LOAD;
  initialLoad: boolean;
}

export interface ProfileData {
  name: string;
  profile_link: string;
  images: ImageData[];
  product: string;
  uri: string;
  id: string;
}

interface ImageData {
  height: number | null;
  url: string;
  width: number | null;
}

export type ProfileActionTypes = RequestProfileAction | ReceiveProfileAction | InitialLoadAction;
