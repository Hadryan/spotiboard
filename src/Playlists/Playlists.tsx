/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useTypedSelector } from '../store/rootReducer';
import { fetchPlaylists, setCurrentPlaylist } from './actions';
import { PlaylistData } from './types';
import NavBar from '../NavBar';
import CurrentlyPlaying from '../CurrentlyPlaying';
import { clearState } from '../PlaylistTracks/actions';
import { fetchProfile } from '../Profile/actions';

import styles from './Playlists.module.scss';

const Playlists: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const playlistsData = useTypedSelector((state) => state.playlists.data);
  const accessTokenValid = useTypedSelector((state) => state.auth.accessTokenValid);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(clearState());
    dispatch(fetchPlaylists());
    dispatch(fetchProfile());
  }, []);

  if (accessTokenValid !== null && !accessTokenValid) return <Redirect to="/" />;

  window.onpopstate = (): void => {
    window.scrollTo(0, 0);
  };

  const handleClick = (playlistId: string, playlistName: string, playlistImgUrl: string): void => {
    dispatch(setCurrentPlaylist(playlistId, playlistName, playlistImgUrl));
  };

  let playlists;

  if (playlistsData) {
    playlists = (
      <ul className={styles.list}>
        {playlistsData.map((playlist: PlaylistData) => {
          let url = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
          if (playlist.images.length !== 0) url = playlist.images[0].url;
          return (
            <Link to="/tracks" style={{ textDecoration: 'none', color: 'white' }} key={playlist.id}>
              <li className={styles.playlist} onClick={(): void => handleClick(playlist.id, playlist.name, url)}>
                <img className={styles.playlistCover} src={url} alt="playlist cover" />
                <div className={styles.name}>{playlist.name}</div>
              </li>
            </Link>

          );
        })}
      </ul>
    );
  }

  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        {playlists}
      </div>
      <CurrentlyPlaying />
    </div>

  );
};

export default Playlists;
