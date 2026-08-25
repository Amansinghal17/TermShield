export interface PageDetectionResult {
  isLegalPage: boolean;
  type: 'terms' | 'privacy' | 'agreement' | 'unknown';
  confidence: number;
}

const TERMS_KEYWORDS = [
  'terms and conditions',
  'terms of service',
  'terms of use',
  'user agreement',
];

const PRIVACY_KEYWORDS = [
  'privacy policy',
  'privacy notice',
  'data privacy',
];

const AGREEMENT_KEYWORDS = [
  'legal agreement',
  'service agreement',
  'end user license agreement',
];

function containsKeyword(
  text: string,
  keywords: string[]
): boolean {
  return keywords.some((keyword) =>
    text.includes(keyword)
  );
}

export function detectLegalPage(): PageDetectionResult {
  const url = window.location.href.toLowerCase();

  const title =
    document.title?.toLowerCase() ?? '';

  const headings = Array.from(
    document.querySelectorAll('h1, h2, h3')
  )
    .map((element) => element.textContent?.toLowerCase() ?? '')
    .join(' ');

  const bodyText =
    document.body?.innerText
      ?.toLowerCase()
      .slice(0, 10000) ?? '';

  const combinedText = `
    ${url}
    ${title}
    ${headings}
    ${bodyText}
  `;

  let score = 0;

  if (
    containsKeyword(combinedText, TERMS_KEYWORDS)
  ) {
    score += 0.6;
  }

  if (
    containsKeyword(combinedText, PRIVACY_KEYWORDS)
  ) {
    score += 0.6;
  }

  if (
    containsKeyword(combinedText, AGREEMENT_KEYWORDS)
  ) {
    score += 0.6;
  }

  if (
    url.includes('terms') ||
    url.includes('tos') ||
    url.includes('legal') ||
    url.includes('privacy')
  ) {
    score += 0.3;
  }

  if (headings.length > 200) {
    score += 0.1;
  }

  const confidence = Math.min(score, 1);

  let type: PageDetectionResult['type'] = 'unknown';

  if (containsKeyword(combinedText, TERMS_KEYWORDS)) {
    type = 'terms';
  } else if (
    containsKeyword(combinedText, PRIVACY_KEYWORDS)
  ) {
    type = 'privacy';
  } else if (
    containsKeyword(combinedText, AGREEMENT_KEYWORDS)
  ) {
    type = 'agreement';
  }

  return {
    isLegalPage: confidence >= 0.6,
    type,
    confidence,
  };
}