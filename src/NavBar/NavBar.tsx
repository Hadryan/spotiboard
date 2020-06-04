import React, { useState, useEffect } from 'react';
import styles from './NavBar.module.scss';
import Burger from './BurgerMenu/Burger';
import Menu from './BurgerMenu/Menu';

const NavBar: React.FC = (): JSX.Element => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [open, setOpen] = useState(false);
  const handleScroll = (): void => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  let container = styles['container-big'];
  let title = styles['title-big'];
  if (scrollPosition >= 30) {
    container = styles['container-small'];
    title = styles['title-small'];
  }


  return (
    <div className={container}>
      <h1 className={title}>Spotiboard</h1>
      <Burger open={open} setOpen={setOpen} scrollPosition={scrollPosition} />
      <Menu open={open} />
    </div>
  );
};

export default NavBar;
