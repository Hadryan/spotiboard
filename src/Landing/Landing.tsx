import React from 'react';
import { login } from '../Auth/actions';
import styles from './Landing.module.scss';

const Landing: React.FC = (): JSX.Element => (
  <div className={styles.container}>
    <h1 className={styles.title}>Spotify Dashboard</h1>
    <h2 className={styles.subtitle}>Interact with statistics from your Spotify history.</h2>
    <button type="button" onClick={(): void => login()} className={styles.button}>LOGIN WITH SPOTIFY</button>
  </div>
);

export default Landing;
