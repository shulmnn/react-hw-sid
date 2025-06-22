import { Outlet } from 'react-router-dom';
import styles from '~/components/Layout/Layout.module.css';
import Header from '~/components/Header';

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
