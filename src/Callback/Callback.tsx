import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveLogin } from './actions';
import { loginSuccess, loginFailure } from '../Auth/actions';

const Callback: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  let redirect;

  useEffect(() => {
    const valid = saveLogin();
    if (!valid) {
      dispatch(loginFailure());
      history.push('/');
    } else {
      dispatch(loginSuccess());
      history.push('/home');
    }
  }, []);

  return (
    <div>
      {redirect}
    </div>
  );
};

export default Callback;
