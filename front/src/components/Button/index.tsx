import styles from '~/components/Button/Button.module.css';

export default function Button({
  type,
  isDisabled,
  onClick,
}: {
  type: 'send' | 'download' | 'clear';
  isDisabled: boolean;
  onClick: () => void;
}) {
  return (
    <div className={styles.wrapper}>
      <button
        disabled={isDisabled}
        onClick={onClick}
        className={`${styles.button} ${styles['button_' + type]}`}
      >
        {type === 'send'
          ? 'Отправить'
          : type === 'download'
          ? 'Скачать'
          : 'Очистить'}
      </button>
    </div>
  );
}
