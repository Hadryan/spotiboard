import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../store/rootReducer';
import { checkToken, logout } from '../Auth/actions';
import { getAccessToken } from '../utils';
import { fetchProfile, initialLoad } from '../Profile/actions';
import CurrentlyPlaying from '../CurrentlyPlaying';
import { fetchCurrentlyPlaying } from '../CurrentlyPlaying/actions';
import Profile from '../Profile';
import NavBar from '../NavBar';
import styles from './Home.module.scss';

const Home: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const isInitialLoaded = useTypedSelector((state) => state.profile.initialLoad);

  useEffect(() => {
    if (!getAccessToken()) {
      dispatch(logout());
      return;
    }
    dispatch(checkToken());
    if (!isInitialLoaded) {
      dispatch(fetchCurrentlyPlaying());
      dispatch(fetchProfile());
      dispatch(initialLoad());
    }
  }, []);

  return (
    <div>
      <NavBar />
      <div className={styles.container}>

        <Profile />
        <Link to="/topcharts">
          <button type="button" className={styles.linkButton}>top charts</button>
        </Link>
        <Link to="/playlists">
          <button type="button" className={styles.linkButton}>playlists</button>
        </Link>
        <CurrentlyPlaying />
      </div>
    </div>


  );
};

export default Home;
