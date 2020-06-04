import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Auth/actions';
import history from '../../../history';
import styles from './Menu.module.scss';

type BurgerProps = {
  open: boolean;
};

const Menu = ({ open }: BurgerProps): JSX.Element => {
  const dispatch = useDispatch();
  let menuStyle = styles.menuHidden;
  if (open) menuStyle = styles.menuOpen;

  return (
    <nav className={menuStyle}>
      <button type="button" className={styles.menuItem} onClick={(): void => history.push('/home')}>
        <span className={styles.menuText}>Home</span>
      </button>
      <button type="button" className={styles.menuItem} onClick={(): void => history.push('/topcharts')}>
        <span className={styles.menuText}>Top Charts</span>
      </button>
      <button type="button" className={styles.menuItem} onClick={(): void => history.push('/playlists')}>
        <span className={styles.menuText}>Playlist <br /> Analyzer</span>
      </button>
      <button type="button" className={styles.menuItem} onClick={(): any => dispatch(logout())}>
        <span className={styles.menuText}>Logout</span>
      </button>
    </nav>
  );
};

export default Menu;
