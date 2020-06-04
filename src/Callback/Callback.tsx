import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveLogin } from './actions';
import history from '../history';
import { loginSuccess, loginFailure } from '../Auth/actions';

import styles from './Callback.module.scss';

const Callback: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    const valid = saveLogin();
    if (!valid) {
      history.replace('/');
      dispatch(loginFailure);
    } else {
      history.replace('/home');
      dispatch(loginSuccess);
    }
  }, []);

  return (
    <h1 className={styles.placeholder}>Loading...</h1>
  );
};

export default Callback;
