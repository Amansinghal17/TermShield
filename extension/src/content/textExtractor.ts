export interface ExtractedText {
  text: string;
  wordCount: number;
  characterCount: number;
}

export function extractPageText(): ExtractedText {
  const body = document.body;

  if (!body) {
    return {
      text: '',
      wordCount: 0,
      characterCount: 0,
    };
  }

  const clone = body.cloneNode(
    true
  ) as HTMLElement;

  const elementsToRemove = clone.querySelectorAll(
    'script, style, noscript, iframe, svg'
  );

  elementsToRemove.forEach((element) => {
    element.remove();
  });

  const text = (clone.innerText || '')
    .replace(/\s+/g, ' ')
    .trim();

  const words = text
    ? text.split(/\s+/).length
    : 0;

  return {
    text,
    wordCount: words,
    characterCount: text.length,
  };
}