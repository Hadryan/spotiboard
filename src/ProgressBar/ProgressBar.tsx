import React from 'react';
import { useTypedSelector } from '../store/rootReducer';
import styles from './ProgressBar.module.scss';

const ProgressBar: React.FC = (): JSX.Element => {
  const progress_ms = useTypedSelector((state) => state.currentlyPlaying.data?.progress_ms) || 0;
  const duration_ms = useTypedSelector((state) => state.currentlyPlaying.data?.duration_ms) || 1;
  const progress = Math.round((progress_ms / duration_ms) * 100);
  const progressStyle = { width: progress + '%' };

  return (
    <div className={styles.meter}>
      <span className={styles.filler} style={progressStyle}><span /></span>
    </div>
  );
};

export default ProgressBar;
