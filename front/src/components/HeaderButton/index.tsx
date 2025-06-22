import { Link } from 'react-router-dom';
import styles from '~/components/HeaderButton/HeaderButton.module.css';

export default function HeaderButton({
  to,
  isActive,
  text,
  iconSrc,
}: {
  to: string;
  isActive: boolean;
  text: string;
  iconSrc: string;
}) {
  return (
    <Link to={to} className={styles.button} replace>
      <div className={styles.container}>
        <img src={iconSrc} alt="icon" className={styles.icon} />
        <p className={styles.text}>{text}</p>
      </div>
      {isActive && <div className={styles.underline}></div>}
    </Link>
  );
}
