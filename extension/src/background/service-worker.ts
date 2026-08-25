chrome.runtime.onInstalled.addListener(() => {
  console.log('TermShield installed');
});

chrome.runtime.onMessage.addListener(
  (message, _sender, sendResponse) => {
    if (message.type === 'PING') {
      sendResponse({
        success: true,
        message: 'TermShield background service is running',
      });
    }

    return true;
  }
);