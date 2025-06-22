import styles from '~/pages/HistoryPage/HistoryPage.module.css';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '~/store';
import HistoryRow from '~/components/HistoryRow';

export default function HistoryPage() {
  const navigate = useNavigate();

  const history = useAppStore((state) => state.history);

  const clearHistory = () => {
    useAppStore.getState().clearHistory();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.rowsContainer}>
        {history.map((item) => (
          <HistoryRow
            key={item.id}
            filename={item.fileName}
            date={item.uploadDate}
            isSuccessful={item.isSuccessful}
          />
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <Button
          type="send"
          isDisabled={false}
          onClick={() => {
            navigate('/');
          }}
        />
        <Button type="clear" isDisabled={false} onClick={clearHistory} />
      </div>
    </div>
  );
}
