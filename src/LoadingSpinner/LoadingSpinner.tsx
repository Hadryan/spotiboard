import React from 'react';

import styles from './LoadingSpinner.module.scss';

const LoadingSpinner: React.FC = (): JSX.Element => (
  <div className={styles.ldsring}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default LoadingSpinner;
