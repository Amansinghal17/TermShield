export interface PageTextResponse {
  success: boolean;
  data?: {
    text: string;
    wordCount: number;
    characterCount: number;
  };
  error?: string;
}

interface PageTextRequest {
  type: 'GET_PAGE_TEXT';
}

export async function getCurrentPageText(): Promise<PageTextResponse> {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const activeTab = tabs[0];

  if (!activeTab?.id) {
    return {
      success: false,
      error: 'No active tab found.',
    };
  }

  try {
    const response = await chrome.tabs.sendMessage(
      activeTab.id,
      {
        type: 'GET_PAGE_TEXT',
      } satisfies PageTextRequest
    );

    return response as PageTextResponse;
  } catch {
    return {
      success: false,
      error: 'TermShield cannot access this page.',
    };
  }
}