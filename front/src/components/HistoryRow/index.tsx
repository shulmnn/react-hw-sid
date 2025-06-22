import styles from '~/components/HistoryRow/HistoryRow.module.css';
import happySmileSrc from '~/assets/happy-smile.svg';
import sadSmileSrc from '~/assets/sad-smile.svg';
import trashSrc from '~/assets/trash.svg';
import fileSrc from '~/assets/file.svg';

export default function HistoryRow({
  filename,
  date,
  isSuccessful,
}: {
  filename: string;
  date: string;
  isSuccessful: boolean;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.container}>
          <img src={fileSrc} alt="" />
          {filename}
        </div>
        <div className={styles.container}>{date}</div>
        <div
          className={`${styles.container} ${
            !isSuccessful ? styles.containerDisabled : ''
          }`}
        >
          Обработан успешно <img src={happySmileSrc} alt="" />
        </div>

        <div
          className={`${styles.container} ${
            isSuccessful ? styles.containerDisabled : ''
          }`}
        >
          Не удалось обработать <img src={sadSmileSrc} alt="" />
        </div>
      </div>
      <div className={styles.delete}>
        <img src={trashSrc} alt="" />
      </div>
    </div>
  );
}
