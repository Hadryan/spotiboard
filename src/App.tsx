import React from 'react';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { store } from './store/store';
import history from './history';

import Landing from './Landing';
import Home from './Home';
import Callback from './Callback';
import TopCharts from './TopCharts';
import Playlists from './Playlists';
import PlaylistTracks from './PlaylistTracks';

import styles from './App.module.scss';

const App: React.FC = (): JSX.Element => (
  <Provider store={store}>
    <div className={styles.container}>
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/callback">
            <Callback />
          </Route>
          <Route exact path="/topcharts">
            <TopCharts />
          </Route>
          <Route exact path="/playlists">
            <Playlists />
          </Route>
          <Route exact path="/tracks">
            <PlaylistTracks />
          </Route>
        </Switch>
      </Router>
    </div>

  </Provider>

);

export default App;
