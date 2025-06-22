/* eslint-disable no-irregular-whitespace */
import { useState } from 'react';
import { processStreamingResponse } from '~/api/requests';
import Button from '~/components/Button';
import InformationRow from '~/components/InformationRow';
import UploadButton from '~/components/UploadButton';
import styles from '~/pages/HomePage/HomePage.module.css';
import { useAppStore } from '~/store';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const streamingData = useAppStore((state) => state.streamingData);
  const updateStreamingData = useAppStore((state) => state.updateStreamingData);
  const addToHistory = useAppStore((state) => state.addToHistory);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files?.[0]);
    }
  };

  const handleClick = async () => {
    if (file) {
      try {
        const data = await processStreamingResponse(file, (data) => {
          updateStreamingData(data);
        });

        addToHistory(file, data, true);
        console.log(data);
      } catch (error) {
        addToHistory(file, null, false);
        console.error('Error processing file:', error);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.header}>
          Загрузите <span>csv</span> файл и получите{' '}
          <span> полную информацию</span> о нём за сверхнизкое время
        </h1>
        <div className={styles.dndContainer}>
          <UploadButton
            buttonText={'Загрузить файл'}
            secondaryText="или перетащите сюда"
            status={!file ? 'idle' : 'uploaded'}
            handleChange={handleChange}
            setFile={setFile}
          />
        </div>
        <Button onClick={handleClick} type="send" isDisabled={!file} />
      </div>
      <div className={styles.history}>
        <InformationRow
          primaryText={streamingData?.total_spend_galactic.toString() || ''}
          secondaryText="общие расходы в галактических кредитах"
        />
        <InformationRow
          primaryText={streamingData?.less_spent_civ || ''}
          secondaryText="цивилизация с минимальными расходами"
        />
        <InformationRow
          primaryText={streamingData?.rows_affected.toString() || ''}
          secondaryText="количество обработанных записей"
        />
        <InformationRow
          primaryText={streamingData?.big_spent_at.toString() || ''}
          secondaryText="день года с максимальными расходами  "
        />
        <InformationRow
          primaryText={streamingData?.less_spent_at.toString() || ''}
          secondaryText="день года с минимальными расходами  "
        />
        <InformationRow
          primaryText={streamingData?.big_spent_value.toString() || ''}
          secondaryText="максимальная сумма расходов за день "
        />
        <InformationRow
          primaryText={streamingData?.big_spent_civ || ''}
          secondaryText="цивилизация с максимальными расходами   "
        />
        <InformationRow
          primaryText={streamingData?.average_spend_galactic.toString() || ''}
          secondaryText=" средние расходы в галактических кредитах"
        />
      </div>
    </div>
  );
}
