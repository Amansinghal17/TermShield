import { create } from 'zustand';
import type { AnalysisResult } from '../types';
import { mockAnalysis } from '../utils/mockData';
import { getCurrentPageText } from '../services/extensionService';
import { analyzePage } from '../services/analysisService';

interface PageInfo {
  title: string;
  url: string;
  text: string;
  wordCount: number;
  characterCount: number;
}

interface ScanStore {
  isScanning: boolean;
  result: AnalysisResult | null;
  pageInfo: PageInfo | null;
  error: string | null;

  startScan: () => void;
  scanCurrentPage: () => Promise<void>;
  completeScan: () => void;
  clearScan: () => void;
}

export const useScanStore = create<ScanStore>(
  (set) => ({
    isScanning: false,
    result: mockAnalysis,
    pageInfo: null,
    error: null,

    startScan: () => {
      set({
        isScanning: true,
        error: null,
      });
    },

    scanCurrentPage: async () => {
  set({
    isScanning: true,
    error: null,
  });

  try {
    const response = await getCurrentPageText();

    if (!response.success || !response.data) {
      throw new Error(
        response.error ?? 'Unable to read this page.'
      );
    }

    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    const activeTab = tabs[0];

    const pageInfo = {
      title: activeTab?.title ?? 'Unknown page',
      url: activeTab?.url ?? '',
      text: response.data.text,
      wordCount: response.data.wordCount,
      characterCount: response.data.characterCount,
    };

    set({
      pageInfo,
    });

    // Backend analysis will happen here.
    const result = await analyzePage(pageInfo);

    set({
      result,
      isScanning: false,
    });
  } catch (error) {
    set({
      isScanning: false,
      error:
        error instanceof Error
          ? error.message
          : 'Something went wrong while scanning.',
    });
  }
},

    completeScan: () => {
      set({
        isScanning: false,
        result: mockAnalysis,
      });
    },

    clearScan: () => {
      set({
        isScanning: false,
        result: null,
        pageInfo: null,
        error: null,
      });
    },
  })
);