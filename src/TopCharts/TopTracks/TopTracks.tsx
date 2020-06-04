/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../store/rootReducer';
import { checkToken, logout } from '../../Auth/actions';
import { fetchTopTracks, fetchRecommendationTracksPlaylist } from './actions';
import { getAccessToken } from '../../utils';
import LoadingSpinner from '../../LoadingSpinner';
import styles from './TopTracks.module.scss';

type TopTracksProps = {
  term: string;
}

type StateData = {
  index: string;
  id: string;
  title: string;
}

const TopTracks = ({ term }: TopTracksProps): JSX.Element => {
  const dispatch = useDispatch();
  const topTracksIsFetching = useTypedSelector((state) => state.topTracks.isFetching);
  const topTracksData = useTypedSelector((state) => state.topTracks.data);
  let userId = useTypedSelector((state) => state.profile.data?.id);
  const [checked, setChecked] = useState<StateData[]>([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const disableElements = (form: any): void => {
    if (!form) return;
    const elementsArr = form.elements;
    for (let i = 0; i < elementsArr.length; i += 1) {
      if (!elementsArr[i].checked) elementsArr[i].disabled = true;
    }
  };

  const enableElements = (form: any): void => {
    if (!form) return;
    const elementsArr = form.elements;
    for (let i = 0; i < elementsArr.length; i += 1) {
      elementsArr[i].disabled = false;
    }
  };

  const clearElements = (): void => {
    setChecked([]);
  };

  useEffect(() => {
    if (checked.length > 0) setSubmitDisabled(false);
    else setSubmitDisabled(true);
  }, [checked]);

  useEffect(() => {
    const form = document.getElementById('form');
    if (checked.length === 5) disableElements(form);
    else enableElements(form);
  }, [checked]);

  useEffect(() => {
    if (!getAccessToken()) {
      dispatch(logout());
    }
    dispatch(checkToken());
  }, []);

  useEffect(() => {
    if (term) {
      clearElements();
      dispatch(fetchTopTracks(term));
    }
  }, [term]);


  let successMessage = <span />;
  if (submitSuccess) successMessage = <span className={styles.successMessage}>Submitted!</span>;

  const handleSubmit = (): void => {
    if (!userId) userId = '';
    const idArr = checked.map((ele: StateData) => ele.id);
    const tracksArr = checked.map((ele: StateData) => ele.title);
    dispatch(fetchRecommendationTracksPlaylist(idArr, tracksArr, userId));
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 3000);
    clearElements();
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formId = String(e.target.id);
    let songId = '';
    let title = '';
    if (topTracksData) {
      songId = topTracksData[Number(formId)].id;
      title = topTracksData[Number(formId)].title;
    }
    let index = -1;
    for (const ele of checked) {
      if (ele.index === formId) index = 0;
    }
    if (index === 0) setChecked(checked.filter((ele) => ele.index !== formId));
    else setChecked(checked.concat([{ index: formId, id: songId, title }]));
  };

  const stateCheck = (id: string): boolean => {
    let flag = false;
    for (const ele of checked) {
      if (ele.index === id) flag = true;
    }
    return flag;
  };

  let TopTracksFetching = null;
  if (topTracksIsFetching) TopTracksFetching = <LoadingSpinner />;

  let tracksClass = styles.tracksHidden;
  if (topTracksData) {
    tracksClass = styles.tracks;
  }
  if (topTracksIsFetching) tracksClass = styles.tracksHidden;

  let submitContainer = styles.submitContainerHidden;
  if (!topTracksIsFetching) submitContainer = styles.submitContainer;

  let submitStyle = styles.submitDisabled;
  if (term && checked.length === 0) submitStyle = styles.submitDisabled;
  else if (term && !topTracksIsFetching) submitStyle = styles.submitEnabled;

  let Tracks = <form className={tracksClass} id="form" />;
  if (topTracksData) {
    Tracks = (
      <div>
        <form className={tracksClass} id="form">
          {topTracksData.map((track, i) => {
            let url = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
            if (track.album_pictures) url = track.album_pictures[track.album_pictures.length - 1].url;

            return (
              <div key={track.rank} className={styles.track}>
                <div className={styles.rank}>{track.rank}</div>
                <img className={styles.albumCover} src={url} alt="album cover" />
                <div className={styles.infoContainer}>
                  <a className={styles.title} href={track.url} target="_blank" rel="noreferrer noopener">
                    {track.title}
                  </a>
                  <br />
                  <span className={styles.artists}>{track.artists.join(', ')}</span>
                </div>
                <input id={String(i)} type="checkbox" checked={stateCheck(String(i))} onChange={handleCheck} />
              </div>
            );
          })}
        </form>
      </div>

    );
  }
  return (
    <div>
      <div className={submitContainer}>
        <span className={styles.submitDescription}>Select up to 5 tracks to create <br /> a recommendation playlist.</span>
        <button className={submitStyle} disabled={submitDisabled} type="button" onClick={(): void => handleSubmit()}>submit</button>
      </div>
      <div className={styles.successMessageContainer}>
        {successMessage}
      </div>
      {TopTracksFetching}
      {Tracks}
    </div>
  );
};

export default TopTracks;
