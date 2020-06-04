import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../store/rootReducer';
import { AppThunk } from '../store/store';
import { fetchProfile } from './actions';
import LoadingSpinner from '../LoadingSpinner';
import styles from './Profile.module.scss';

const Profile: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const profileIsFetching = useTypedSelector((state) => state.profile.isFetching);
  const profileData = useTypedSelector((state) => state.profile.data);


  let profileFetchingStatus = null;
  if (profileIsFetching) profileFetchingStatus = <LoadingSpinner />;
  else profileFetchingStatus = <h1>fetched!</h1>;

  let name = 'User';
  if (profileData && profileData.name) name = profileData.name;

  let url = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  if (profileData && profileData.images.length !== 0) url = profileData.images[0].url;

  return (
    <div className={styles.container}>
      <img src={url} alt="profile" className={styles.profilePicture} />
      <h2 className={styles.greeting}>Welcome, {name}!</h2>
      <h5 className={styles.description}>Check out a page to get started.</h5>
    </div>

  );
};

export default Profile;
