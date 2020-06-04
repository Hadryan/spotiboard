/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styles from './Burger.module.scss';

type BurgerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scrollPosition: number;
}

const Burger = ({ open, setOpen, scrollPosition }: BurgerProps): JSX.Element => {
  let container = styles.containerBig;

  if (scrollPosition >= 30) container = styles.containerSmall;

  let style1 = styles.bar1;
  let style2 = styles.bar2;
  let style3 = styles.bar3;
  if (open) {
    style1 = styles['bar1-open'];
    style2 = styles['bar2-open'];
    style3 = styles['bar3-open'];
  }


  return (
    <div className={container} onClick={(): void => setOpen(!open)}>
      <div className={style1} />
      <div className={style2} />
      <div className={style3} />
    </div>
  );
};

export default Burger;
