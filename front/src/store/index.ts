import { create } from 'zustand';
import type { AggregationData } from '~/api/requests';

interface HistoryRecord {
  id: string;
  fileName: string;
  uploadDate: string;
  results: AggregationData | null;
  isSuccessful: boolean;
}

interface AppState {
  isUploading: boolean;
  uploadProgress: AggregationData | null;
  uploadedFile: File | null;
  uploadError: string | null;

  history: HistoryRecord[];
  streamingData: AggregationData | null;

  setUploadingState: (isUploading: boolean) => void;
  setUploadProgress: (progress: AggregationData) => void;
  setUploadedFile: (file: File | null) => void;
  setUploadError: (error: string | null) => void;
  addToHistory: (
    file: File,
    results: AggregationData | null,
    isSuccessful: boolean
  ) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  clearUploadState: () => void;
  loadHistoryFromStorage: () => void;
  updateStreamingData: (data: AggregationData) => void;
}

const STORAGE_KEY = 'intergalactic-analytics-history';

export const useAppStore = create<AppState>((set, get) => ({
  isUploading: false,
  uploadProgress: null,
  uploadedFile: null,
  uploadError: null,
  history: [],
  streamingData: null,

  setUploadingState: (isUploading) => set({ isUploading }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  setUploadedFile: (file) => set({ uploadedFile: file }),
  setUploadError: (error) => set({ uploadError: error }),

  addToHistory: (file, results, isSuccessful) => {
    const newRecord: HistoryRecord = {
      id: Date.now().toString(),
      fileName: file.name,
      uploadDate: new Date().toISOString(),
      results,
      isSuccessful,
    };

    const newHistory = [newRecord, ...get().history];
    set({ history: newHistory });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  },

  removeFromHistory: (id) => {
    const newHistory = get().history.filter((record) => record.id !== id);
    set({ history: newHistory });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  },

  clearHistory: () => {
    set({ history: [] });
    localStorage.removeItem(STORAGE_KEY);
  },

  clearUploadState: () =>
    set({
      isUploading: false,
      uploadProgress: null,
      uploadedFile: null,
      uploadError: null,
    }),

  loadHistoryFromStorage: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const history = JSON.parse(saved) as HistoryRecord[];
        set({ history });
      }
    } catch (error) {
      console.error('Failed to load history from storage:', error);
    }
  },

  updateStreamingData: (data) => {
    set({ streamingData: data });
  },
}));
