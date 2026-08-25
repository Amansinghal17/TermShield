import { detectLegalPage } from './pageDetector';
import { extractPageText } from './textExtractor';

console.log('TermShield content script loaded');

function createDetectionBanner(
  type: string,
  confidence: number
) {
  if (document.getElementById('termshield-banner')) {
    return;
  }

  const banner = document.createElement('div');

  banner.id = 'termshield-banner';

  banner.innerHTML = `
    <div>
      <div style="
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 4px;
      ">
        🛡️ TermShield
      </div>

      <div style="
        font-size: 12px;
        opacity: 0.8;
      ">
        ${type} page detected
      </div>

      <div style="
        font-size: 11px;
        opacity: 0.6;
        margin-top: 4px;
      ">
        Detection confidence: ${Math.round(
          confidence * 100
        )}%
      </div>
    </div>

    <button
      id="termshield-close"
      style="
        border: none;
        background: transparent;
        color: white;
        cursor: pointer;
        font-size: 18px;
      "
    >
      ×
    </button>
  `;

  Object.assign(banner.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: '2147483647',
    width: '280px',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    background: '#0f172a',
    color: '#ffffff',
    border: '1px solid #334155',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
    fontFamily:
      'Arial, Helvetica, sans-serif',
  });

  document.body.appendChild(banner);

  const closeButton =
    document.getElementById('termshield-close');

  closeButton?.addEventListener('click', () => {
    banner.remove();
  });
}

function runDetection() {
  const result = detectLegalPage();

  if (result.isLegalPage) {
  const extracted = extractPageText();

  console.log(
    'TermShield extracted text:',
    extracted
  );
}

  console.log('TermShield detection:', result);

  if (result.isLegalPage) {
    createDetectionBanner(
      result.type,
      result.confidence
    );
  }
}

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    runDetection
  );
} else {
  runDetection();
}

chrome.runtime.onMessage.addListener(
  (message, _sender, sendResponse) => {
    if (message.type === 'GET_PAGE_TEXT') {
      const extracted = extractPageText();

      sendResponse({
        success: true,
        data: extracted,
      });
    }

    return true;
  }
);