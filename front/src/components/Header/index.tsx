import styles from '~/components/Header/Header.module.css';

import yandexLogoUrl from '~/assets/yandex-logo.svg';
import HeaderButton from '~/components/HeaderButton';
import uploadLogoSrc from '~/assets/upload.svg';
import generatorLogoSrc from '~/assets/generator.svg';
import historyLogoSrc from '~/assets/history.svg';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <img src={yandexLogoUrl} alt="yandex logo" />
        </div>
        <div>
          <h1>Межгалактическая аналитика</h1>
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <HeaderButton
          to="/"
          isActive={location.pathname === '/'}
          text="CSV Аналитик"
          iconSrc={uploadLogoSrc}
        />
        <HeaderButton
          to="/generator"
          isActive={location.pathname === '/generator'}
          text="CSV Генератор"
          iconSrc={generatorLogoSrc}
        />
        <HeaderButton
          to="/history"
          isActive={location.pathname === '/history'}
          text="История"
          iconSrc={historyLogoSrc}
        />
      </div>
    </div>
  );
}
