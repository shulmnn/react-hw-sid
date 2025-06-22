import styles from '~/components/InformationRow/InfrormationRow.module.css';

export default function InformationRow({
  primaryText,
  secondaryText,
}: {
  primaryText: string;
  secondaryText: string;
}) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.primaryText}>{primaryText}</h1>
      <p className={styles.secondaryText}>{secondaryText}</p>
    </div>
  );
}
