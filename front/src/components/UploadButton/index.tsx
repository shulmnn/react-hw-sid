import styles from '~/components/UploadButton/UploadButton.module.css';
import cancelIconSrc from '~/assets/cancel.svg';

export default function UploadButton({
  buttonText,
  secondaryText,
  status,
  handleChange,
  setFile,
}: {
  buttonText: string;
  secondaryText: string;
  status: 'idle' | 'uploaded' | 'loading' | 'success' | 'error';
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonsWrapper}>
        <input
          type="file"
          placeholder={status === 'loading' ? 'loading...' : buttonText}
          onChange={handleChange}
          className={`${styles.mainButton} ${styles['mainButton_' + status]}`}
        />

        {status !== 'idle' && status !== 'loading' && (
          <button onClick={() => setFile(null)} className={styles.cancelButton}>
            <img src={cancelIconSrc} alt="" />
          </button>
        )}
      </div>
      <h1 className={styles.text}>{secondaryText}</h1>
    </div>
  );
}
