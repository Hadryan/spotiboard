/* eslint-disable prefer-destructuring */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../store/rootReducer';
import history from '../history';
import { fetchTracksAnalysis, clearState } from './actions';
import styles from './PlaylistTracks.module.scss';
import LoadingSpinner from '../LoadingSpinner';
import NavBar from '../NavBar';
import CurrentlyPlaying from '../CurrentlyPlaying';
import { fetchProfile } from '../Profile/actions';

const PlaylistTracks: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentlyPlayingId = useTypedSelector((state) => state.playlists.currentPlaylistId);
  const playlistName = useTypedSelector((state) => state.playlists.currentPlaylistName);
  const playlistImgUrl = useTypedSelector((state) => state.playlists.currentPlaylistImgUrl);
  const tracks = useTypedSelector((state) => state.playlistTracks.tracks);
  const tracksAnalysisData = useTypedSelector((state) => state.playlistTracks.analysis);

  window.onpopstate = (): any => {
    window.scrollTo(0, 0);
    return dispatch(clearState());
  };

  let TracksAnalysis = <div className={styles.analysisContainer}><LoadingSpinner /></div>;
  let Tracks = null;
  if (tracks && tracksAnalysisData) {
    TracksAnalysis = (
      <form className={styles.analysisContainer}>
        <span className={styles.description}>danceability: {Math.round(tracksAnalysisData.danceability * 100) + '%'}</span>
        <input className={styles.range} type="range" disabled min="0" max="1" value={tracksAnalysisData.danceability} step="0.01" />
        <span className={styles.description}>positiveness: {Math.round(tracksAnalysisData.valence * 100) + '%'}</span>
        <input className={styles.range} type="range" disabled min="0" max="1" value={tracksAnalysisData.valence} step="0.01" />
        <span className={styles.description}>energy: {Math.round(tracksAnalysisData.energy * 100) + '%'}</span>
        <input className={styles.range} type="range" disabled min="0" max="1" value={tracksAnalysisData.energy} step="0.01" />
        <span className={styles.description}>acousticness: {Math.round(tracksAnalysisData.acousticness * 100) + '%'}</span>
        <input className={styles.range} type="range" disabled min="0" max="1" value={tracksAnalysisData.acousticness} step="0.01" />
      </form>
    );
    let newTracks = tracks;
    if (tracks.length > 25) newTracks = tracks.slice(0, 25);
    Tracks = (
      <div>
        <h1 className={styles.preview}>Preview of playlist:</h1>
        <ul className={styles.tracksContainer}>
          {newTracks.map((track: any) => {
            let url = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
            if (track.album_pictures.length !== 0) url = track.album_pictures[track.album_pictures.length - 1].url;
            return (
              <li className={styles.track}>
                <img className={styles.albumCover} src={url} alt="album cover" />
                <span className={styles.name}>{track.name}</span>
                <span className={styles.artists}>{track.artists.join(', ')}</span>
              </li>
            );
          })}
        </ul>
      </div>

    );
  }

  useEffect(() => {
    dispatch(fetchProfile());
    window.scrollTo(0, 0);
    if (!currentlyPlayingId) history.replace('/playlists');
    if (currentlyPlayingId) dispatch(fetchTracksAnalysis(currentlyPlayingId));
  }, []);


  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.playlistInfo}>
          <img className={styles.playlistCover} src={playlistImgUrl} alt="playlist cover" />
          <span className={styles.playlistName}>{playlistName}</span>
        </div>
        {TracksAnalysis}

        {Tracks}
      </div>
      <CurrentlyPlaying />
    </div>
  );
};

export default PlaylistTracks;
