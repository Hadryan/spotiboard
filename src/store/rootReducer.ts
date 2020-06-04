import { combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import AuthReducer from '../Auth/reducer';
import CurrentlyPlayingReducer from '../CurrentlyPlaying/reducer';
import ProfileReducer from '../Profile/reducer';
import TopArtists from '../TopCharts/TopArtists/reducer';
import TopTracks from '../TopCharts/TopTracks/reducer';
import PlaylistsReducer from '../Playlists/reducer';
import PlaylistTracksReducer from '../PlaylistTracks/reducer';

export const rootReducer = combineReducers({
  auth: AuthReducer,
  currentlyPlaying: CurrentlyPlayingReducer,
  profile: ProfileReducer,
  topArtists: TopArtists,
  topTracks: TopTracks,
  playlists: PlaylistsReducer,
  playlistTracks: PlaylistTracksReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
