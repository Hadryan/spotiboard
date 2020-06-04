import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useTypedSelector } from '../store/rootReducer';
import NavBar from '../NavBar';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import CurrentlyPlaying from '../CurrentlyPlaying';
import { getAccessToken } from '../utils';
import { logout, checkToken } from '../Auth/actions';
import { fetchProfile } from '../Profile/actions';
import styles from './TopCharts.module.scss';

const TopCharts: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [type, setType] = useState('tracks');
  const [term, setTerm] = useState('short_term');
  const accessTokenValid = useTypedSelector((state) => state.auth.accessTokenValid);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!getAccessToken()) {
      dispatch(logout());
      return;
    }
    dispatch(checkToken());
    dispatch(fetchProfile());
  }, []);

  if (accessTokenValid !== null && !accessTokenValid) return <Redirect to="/" />;

  window.onpopstate = (): void => {
    window.scrollTo(0, 0);
  };

  let style1 = styles.termTextInactive;
  let style2 = styles.termTextInactive;
  let style3 = styles.termTextInactive;

  if (term === 'short_term') style1 = styles.termTextActive;
  else if (term === 'medium_term') style2 = styles.termTextActive;
  else if (term === 'long_term') style3 = styles.termTextActive;

  let typeComponent;
  if (type === 'tracks') typeComponent = <TopTracks term={term} />;
  else typeComponent = <TopArtists term={term} />;

  let trackStyle = styles.typeButton;
  let artistsStyle = styles.typeButton;
  if (type === 'tracks') trackStyle = styles.typeButtonActive;
  else if (type === 'artists') artistsStyle = styles.typeButtonActive;

  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.title}>Top Charts</h1>
        <h2 className={styles.description}>Check out your top tracks and artists and make recommendation playlists based on your selections</h2>
        <div className={styles.typeContainer}>
          <button className={trackStyle} type="button" onClick={(): void => setType('tracks')}>
            <span>Tracks</span>
          </button>
          <button className={artistsStyle} type="button" onClick={(): void => setType('artists')}>
            <span>Artists</span>
          </button>
        </div>
        <div className={styles.termContainer}>
          <button className={styles.termButton} type="button" onClick={(): void => setTerm('short_term')}>
            <span className={style1}>1 Month</span>
          </button>
          <button className={styles.termButton} type="button" onClick={(): void => setTerm('medium_term')}>
            <span className={style2}>6 Months</span>
          </button>
          <button className={styles.termButton} type="button" onClick={(): void => setTerm('long_term')}>
            <span className={style3}>All Time</span>
          </button>
        </div>
        {typeComponent}
      </div>
      <CurrentlyPlaying />
    </div>

  );
};

export default TopCharts;
