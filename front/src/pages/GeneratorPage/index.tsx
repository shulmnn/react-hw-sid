import { useState } from 'react';
import { generateFile } from '~/api/requests';
import Button from '~/components/Button';
import styles from '~/pages/GeneratorPage/GeneratorPage.module.css';

export default function GeneratorPage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const blob = await generateFile({
        size: Math.random() * 0.1,
        withErrors: Math.random() > 0.5 ? 'off' : 'withErrors',
        maxSpend: Math.random() * 10000000000,
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'report.csv';
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Сгенерируйте готовый csv-файл нажатием одной кнопки</h1>
      <Button
        type={isDownloading ? 'download' : 'send'}
        isDisabled={isDownloading}
        onClick={handleDownload}
      />
    </div>
  );
}
