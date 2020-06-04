import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../Auth/actions';
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
      <Link to="/home">
        <button type="button" className={styles.menuItem}>
          <span className={styles.menuText}>Home</span>
        </button>
      </Link>
      <Link to="/topcharts">
        <button type="button" className={styles.menuItem}>
          <span className={styles.menuText}>Top Charts</span>
        </button>
      </Link>
      <Link to="/playlists">
        <button type="button" className={styles.menuItem}>
          <span className={styles.menuText}>Playlist <br /> Analyzer</span>
        </button>
      </Link>
      <Link to="/">
        <button type="button" className={styles.menuItem} onClick={(): any => dispatch(logout())}>
          <span className={styles.menuText}>Logout</span>
        </button>
      </Link>

    </nav>
  );
};

export default Menu;
