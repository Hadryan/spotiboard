import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as workerTimers from 'worker-timers';
import { useTypedSelector } from '../store/rootReducer';
import { AppThunk } from '../store/store';
import {
  fetchCurrentlyPlaying,
  updateProgress,
  fetchPausePlayback,
  fetchResumePlayback,
  fetchNextPlayback,
  fetchPreviousPlayback,
  fetchRepeat,
  fetchShuffle,
} from './actions';
import { msToMinutesSeconds } from '../utils';
import ProgressBar from '../ProgressBar';

import play from '../assets/play.png';
import pause from '../assets/pause.png';
import next from '../assets/next.png';
import previous from '../assets/previous.png';
import shuffle from '../assets/shuffle.png';
import repeat from '../assets/repeat.png';
import repeatonce from '../assets/repeatonce.png';
import styles from './CurrentlyPlaying.module.scss';

const CurrentlyPlaying: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentlyPlayingData = useTypedSelector((state) => state.currentlyPlaying.data);
  const isPremium = useTypedSelector((state) => state.profile.data?.product) === 'premium';

  useEffect(() => {
    const refresh = workerTimers.setInterval(() => {
      dispatch(fetchCurrentlyPlaying());
    }, 5000);
    return (): void => workerTimers.clearInterval(refresh);
  }, []);

  // store progress in ms locally to avoid too many calls to api
  useEffect(() => {
    if (currentlyPlayingData && currentlyPlayingData.progress_ms >= currentlyPlayingData.duration_ms) {
      workerTimers.setTimeout(() => {
        dispatch(fetchCurrentlyPlaying());
      }, 275);
    } else {
      const interval = workerTimers.setInterval(() => {
        if (currentlyPlayingData && currentlyPlayingData.is_playing) dispatch(updateProgress(currentlyPlayingData.progress_ms + 1000));
      }, 1000);
      return (): void => workerTimers.clearInterval(interval);
    }
    return undefined;
  }, [currentlyPlayingData?.progress_ms, currentlyPlayingData?.is_playing]);

  // update tags based on data
  let title = '';
  let artists = '';
  let progressTime = '0:00';
  let durationTime = '0:00';
  if (currentlyPlayingData) {
    title = currentlyPlayingData.name;
    artists = currentlyPlayingData.artists.join(', ');
    progressTime = msToMinutesSeconds(currentlyPlayingData.progress_ms);
    durationTime = msToMinutesSeconds(currentlyPlayingData.duration_ms);
  }

  // configure player buttons
  let playPauseButton = <h1 className={styles.notPlaying}>Start a track on a player to get started!</h1>;
  if (!isPremium) playPauseButton = <h1 className={styles.notPlaying}>Premium required for player.</h1>;
  else if (currentlyPlayingData && currentlyPlayingData.is_playing) {
    playPauseButton = (
      <button type="button" onClick={(): AppThunk => dispatch(fetchPausePlayback())} className={styles.navButton}>
        <img src={pause} alt="pause" className={styles.playPauseButton} />
      </button>
    );
  } else if (currentlyPlayingData && !currentlyPlayingData.is_playing) {
    playPauseButton = (
      <button type="button" onClick={(): AppThunk => dispatch(fetchResumePlayback())} className={styles.navButton}>
        <img src={play} alt="play" className={styles.playPauseButton} />
      </button>
    );
  }
  let previousButton;
  if (currentlyPlayingData && isPremium) {
    previousButton = (
      <button type="button" onClick={(): AppThunk => dispatch(fetchPreviousPlayback())} className={styles.navButton}>
        <img src={previous} alt="previous" className={styles.navImg} />
      </button>
    );
  }
  let nextButton;
  if (currentlyPlayingData && isPremium) {
    nextButton = (
      <button type="button" onClick={(): AppThunk => dispatch(fetchNextPlayback())} className={styles.navButton}>
        <img src={next} alt="next" className={styles.navImg} />
      </button>
    );
  }
  let shuffleButton;
  if (currentlyPlayingData && isPremium) {
    let style;
    if (currentlyPlayingData.shuffle_state) style = styles.shuffleActive;
    else style = styles.shuffleButton;
    shuffleButton = (
      <button type="button" onClick={(): AppThunk => dispatch(fetchShuffle(currentlyPlayingData.shuffle_state))} className={styles.navButton}>
        <img src={shuffle} className={style} alt="shuffle" />
      </button>
    );
  }
  let repeatButton;
  if (currentlyPlayingData && isPremium) {
    let url;
    let style;
    if (currentlyPlayingData.repeat_state === 'off') {
      url = repeat;
      style = styles.repeatButton;
    } else if (currentlyPlayingData.repeat_state === 'context') {
      url = repeat;
      style = styles.repeatActive;
    } else {
      url = repeatonce;
      style = styles.repeatActive;
    }
    repeatButton = (
      <button className={styles.navButton} onClick={(): AppThunk => dispatch(fetchRepeat(currentlyPlayingData.repeat_state))} type="button">
        <img src={url} className={style} alt="repeat" />
      </button>
    );
  }

  let url = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
  if (currentlyPlayingData && currentlyPlayingData.album_cover.length !== 0) url = currentlyPlayingData.album_cover[2].url;

  return (
    <div className={styles.container}>
      <img className={styles.albumCover} src={url} alt="album cover" />

      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.artists}>{artists}</h2>
      </div>

      <div className={styles.controlWrapper}>
        <div className={styles.playerControls}>
          {shuffleButton}
          {previousButton}
          {playPauseButton}
          {nextButton}
          {repeatButton}
        </div>

        <div className={styles.timeWrapper}>
          <div className={styles.time}>{progressTime}</div>
          <ProgressBar />
          <div className={styles.time}>{durationTime}</div>
        </div>

      </div>
    </div>
  );
};

export default CurrentlyPlaying;
