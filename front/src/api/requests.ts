export interface AggregationData {
  total_spend_galactic: number;
  rows_affected: number;
  less_spent_at: number;
  big_spent_at: number;
  less_spent_value: number;
  big_spent_value: number;
  average_spend_galactic: number;
  big_spent_civ: string;
  less_spent_civ: string;
}

export const processStreamingResponse = async (
  file: File,
  onProgress: (data: AggregationData) => void
): Promise<AggregationData> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`http://localhost:3000/aggregate?rows=10000`, {
    method: 'POST',
    body: formData,
  });

  if (!response.body) {
    throw new Error('No response body');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let finalResult: AggregationData | null = null;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      const lines = chunk.split('\n').filter((line) => line.trim());

      for (const line of lines) {
        try {
          const data = JSON.parse(line) as AggregationData;
          finalResult = data;
          onProgress(data);
        } catch {
          console.error('Error parsing JSON:', line);
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  if (!finalResult) {
    throw new Error('No data received from server');
  }

  return finalResult;
};

export const generateFile = async ({
  size,
  withErrors = 'off',
  maxSpend = 1000,
}: {
  size: number;
  withErrors: 'off' | 'withErrors';
  maxSpend: number;
}): Promise<Blob> => {
  const response = await fetch(
    `http://localhost:3000/report?size=${size}&withErrors=${withErrors}&maxSpend=${maxSpend}`,
    {
      method: 'GET',
    }
  );

  return response.blob();
};
