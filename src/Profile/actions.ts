import { AppThunk } from '../store/store';
import { config } from '../utils';
import {
  REQUEST_PROFILE,
  RECEIVE_PROFILE,
  ProfileData,
  ProfileActionTypes,
  INITIAL_LOAD,
} from './types';
import { logout } from '../Auth/actions';

const requestProfile = (): ProfileActionTypes => ({
  type: REQUEST_PROFILE,
  isFetching: true,
});

const receiveProfile = (data: ProfileData): ProfileActionTypes => ({
  type: RECEIVE_PROFILE,
  isFetching: false,
  data,
});

export const initialLoad = (): ProfileActionTypes => ({
  type: INITIAL_LOAD,
  initialLoad: true,
});

export const fetchProfile = (): AppThunk => async (dispatch): Promise<ProfileActionTypes> => {
  dispatch(requestProfile());
  const accessToken = localStorage.getItem('accessToken');
  const url = config.API_URL + '/me';
  const headers = new Headers({
    Authorization: 'Bearer ' + accessToken,
  });
  const response = await fetch(url, { headers });
  if (response.status >= 400) {
    dispatch(logout());
  }
  const json = await response.json();
  const modifiedJson = {
    name: json.display_name,
    profile_link: json.external_urls.spotify,
    images: json.images,
    product: json.product,
    uri: json.uri,
    id: json.id,
  };
  return dispatch(receiveProfile(modifiedJson));
};
