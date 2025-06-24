import productData from './mockdata.json';

const sampleFiles = [
  { name: 'catalog.pdf', url: 'https://example.com/catalog.pdf' },
  { name: 'spec-sheet.pdf', url: 'https://example.com/spec-sheet.pdf' }
];

export interface StreamFrame {
  channel: 'chat' | 'artifact';
  delta?: string;
  isFinal?: boolean;
  artifactId?: string;
  op?: 'replace' | 'append' | 'remove';
  value?: any;
}

const getRandomProducts = (n: number) => {
  const arr = [...productData];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
};

export function sendUserMessage(userText: string, onFrame: (f: StreamFrame) => void) {
  const scenario: Array<{ delayMs: number; frame: StreamFrame }> = [];

  // All scenarios begin with "Here" for demo consistency
  scenario.push({ delayMs: 0, frame: { channel: 'chat', delta: 'Here ' } });

  const lower = userText.toLowerCase();

  if (lower.includes('file')) {
    scenario.push(
      { delayMs: 160, frame: { channel: 'chat', delta: 'are ' } },
      { delayMs: 120, frame: { channel: 'chat', delta: 'the ' } },
      { delayMs: 140, frame: { channel: 'chat', delta: 'files ' } },
      { delayMs: 120, frame: { channel: 'chat', delta: 'you ' } },
      { delayMs: 100, frame: { channel: 'chat', delta: 'requested.' } },
      { delayMs: 60,  frame: { channel: 'chat', delta: '', isFinal: true } },
      { delayMs: 120, frame: { channel: 'artifact', artifactId: 'file_list', op: 'replace', value: sampleFiles } }
    );
  } else if (lower.includes('product')) {
    scenario.push(
      { delayMs: 180, frame: { channel: 'chat', delta: 'are ' } },
      { delayMs: 120, frame: { channel: 'chat', delta: 'some ' } },
      { delayMs: 180, frame: { channel: 'chat', delta: 'camera ' } },
      { delayMs: 100, frame: { channel: 'artifact', artifactId: 'prod_cards', op: 'replace', value: getRandomProducts(6) } },
      { delayMs: 140, frame: { channel: 'chat', delta: 'recommendations.' } },
      { delayMs: 60,  frame: { channel: 'chat', delta: '', isFinal: true } }
    );
  } else {
    scenario.push(
      { delayMs: 180, frame: { channel: 'chat', delta: 'is ' } },
      { delayMs: 120, frame: { channel: 'chat', delta: 'a ' } },
      { delayMs: 180, frame: { channel: 'chat', delta: 'demo ' } },
      { delayMs: 100, frame: { channel: 'chat', delta: 'response.' } },
      { delayMs: 60,  frame: { channel: 'chat', delta: '', isFinal: true } }
    );
  }
  let t = 0;
  scenario.forEach(({ delayMs, frame }) => {
    t += delayMs;
    setTimeout(() => onFrame({ ...frame }), t);
  });
}
