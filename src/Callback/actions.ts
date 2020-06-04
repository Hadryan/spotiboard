import queryString from 'query-string';
import history from '../history';

export const saveLogin = async (): Promise<boolean> => {
  const { location } = window;
  const values = queryString.parse(location.hash);
  if (values.access_token) {
    const accessToken = String(values.access_token);
    localStorage.setItem('accessToken', accessToken);
    return true;
  }
  localStorage.removeItem('accessToken');
  history.replace('/');
  return false;
};
