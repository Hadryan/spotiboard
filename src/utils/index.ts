// Default config for Spotify
export const config = {
  API_URL: 'https://api.spotify.com/v1',
  SPOTIFY_AUTHORIZE_URL: 'https://accounts.spotify.com/authorize',
  SPOTIFY_AUTH_SCOPES: 'user-read-currently-playing playlist-read-private user-top-read user-read-private playlist-modify-public playlist-modify-private user-modify-playback-state user-read-playback-state playlist-read-collaborative',
  CLIENT_ID: '25f8a5dace1c42e2a375b3a979c89ff5',
  CALLBACK_URL: `${window.location.origin}/#/callback`,
  DEFAULT_COUNTRY_CODE: 'US',
};

/*
 * Takes a base url string and a query object and attaches queries onto base url
 * @return a url with base "url" and populated with queries from "query"
 */
export const urlHelper = (url: string, query: Record<string, string | boolean | number>): string => {
  let queryUrl = url;
  if (query !== null) {
    queryUrl += '?'
    + Object.keys(query).map((obj) => (
      encodeURIComponent(obj) + '=' + encodeURIComponent(query[obj])
    )).join('&');
  }
  return queryUrl;
};

export const authorizeUser = (): void => {
  const loginOptions = {
    client_id: config.CLIENT_ID,
    response_type: 'token',
    redirect_uri: config.CALLBACK_URL,
    scope: config.SPOTIFY_AUTH_SCOPES,
  };
  const authorizeUrl = urlHelper(config.SPOTIFY_AUTHORIZE_URL, loginOptions);

  window.location.href = authorizeUrl;
};

export const getAccessToken = (): string | null => (
  localStorage.getItem('accessToken')
);

export const msToMinutesSeconds = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return (Number(seconds) === 60 ? (minutes + 1) + ':00' : minutes + ':' + (Number(seconds) < 10 ? '0' : '') + seconds);
};
