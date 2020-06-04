/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../store/rootReducer';
import { checkToken, logout } from '../../Auth/actions';
import { fetchTopArtists, fetchRecommendationArtistsPlaylist } from './actions';
import { getAccessToken } from '../../utils';
import LoadingSpinner from '../../LoadingSpinner';
import styles from './TopArtists.module.scss';

type TopArtistsProps = {
  term: string;
}

type StateData = {
  index: string;
  id: string;
  name: string;
}

const TopArtists = ({ term }: TopArtistsProps): JSX.Element => {
  const dispatch = useDispatch();
  const topArtistsIsFetching = useTypedSelector((state) => state.topArtists.isFetching);
  const topArtistsData = useTypedSelector((state) => state.topArtists.data);
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
      dispatch(fetchTopArtists(term));
    }
  }, [term]);

  let successMessage = <span />;
  if (submitSuccess) successMessage = <span className={styles.successMessage}>Submitted!</span>;

  const handleSubmit = (): void => {
    if (!userId) userId = '';
    const idArr = checked.map((ele: StateData) => ele.id);
    const artistsArr = checked.map((ele: StateData) => ele.name);
    dispatch(fetchRecommendationArtistsPlaylist(idArr, artistsArr, userId));
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 3000);
    clearElements();
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formId = String(e.target.id);
    let songId = '';
    let name = '';
    if (topArtistsData) {
      songId = topArtistsData[Number(formId)].id;
      name = topArtistsData[Number(formId)].name;
    }
    let index = -1;
    for (const ele of checked) {
      if (ele.index === formId) index = 0;
    }
    if (index === 0) setChecked(checked.filter((ele) => ele.index !== formId));
    else setChecked(checked.concat([{ index: formId, id: songId, name }]));
  };

  const stateCheck = (id: string): boolean => {
    let flag = false;
    for (const ele of checked) {
      if (ele.index === id) flag = true;
    }
    return flag;
  };

  let TopArtistsFetching = null;
  if (topArtistsIsFetching) TopArtistsFetching = <LoadingSpinner />;

  let artistsClass = styles.artistsHidden;
  if (topArtistsData) {
    artistsClass = styles.artists;
  }
  if (topArtistsIsFetching) artistsClass = styles.artistsHidden;

  let submitContainer = styles.submitContainerHidden;
  if (!topArtistsIsFetching) submitContainer = styles.submitContainer;

  let submitStyle = styles.submitDisabled;
  if (term && checked.length === 0) submitStyle = styles.submitDisabled;
  else if (term && !topArtistsIsFetching) submitStyle = styles.submitEnabled;

  let artists = <form className={artistsClass} id="form" />;
  if (topArtistsData) {
    artists = (
      <div>
        <form className={artistsClass} id="form">
          {topArtistsData.map((artist, i) => {
            let url = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
            if (artist.artist_pictures.length !== 0) url = artist.artist_pictures[artist.artist_pictures.length - 1].url;

            return (
              <div key={artist.rank} className={styles.artist}>
                <div className={styles.rank}>{artist.rank}</div>
                <img className={styles.artistPicture} src={url} alt="album cover" />
                <div className={styles.infoContainer}>
                  <a className={styles.name} href={artist.url} target="_blank" rel="noreferrer noopener">
                    {artist.name}
                  </a>
                  <br />
                  <span className={styles.genres}>{artist.genres.join(', ')}</span>
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
        <span className={styles.submitDescription}>Select up to 5 artists to create <br /> a recommendation playlist.</span>
        <button className={submitStyle} disabled={submitDisabled} type="button" onClick={(): void => handleSubmit()}>submit</button>
      </div>
      <div className={styles.successMessageContainer}>
        {successMessage}
      </div>
      {TopArtistsFetching}
      {artists}
    </div>
  );
};

export default TopArtists;
