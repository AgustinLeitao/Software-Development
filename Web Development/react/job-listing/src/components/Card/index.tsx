import { ReactNode } from 'react';
import styles from './Card.module.scss';

interface CardProps {
  children: ReactNode;
  bg?: keyof typeof styles;
}

const Card = ({ children, bg = 'bgGray100' }: CardProps) => {
  return <div className={`${styles.card} ${styles[bg]}`}>{children}</div>;
};

export default Card;
