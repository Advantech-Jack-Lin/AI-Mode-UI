import productData from './mockdata.json';

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
  const scenario: Array<{ delayMs: number; frame: StreamFrame }> = [
    { delayMs: 0,   frame: { channel: 'chat', delta: 'Here ' } },
    { delayMs: 180, frame: { channel: 'chat', delta: 'are ' } },
    { delayMs: 120, frame: { channel: 'chat', delta: 'some ' } },
    { delayMs: 180, frame: { channel: 'chat', delta: 'camera ' } },
    { delayMs: 100, frame: { channel: 'artifact', artifactId: 'prod_cards', op: 'replace', value: getRandomProducts(6) } },
    { delayMs: 140, frame: { channel: 'chat', delta: 'recommendations.' } },
    { delayMs: 60,  frame: { channel: 'chat', delta: '', isFinal: true } },
  ];
  let t = 0;
  scenario.forEach(({ delayMs, frame }) => {
    t += delayMs;
    setTimeout(() => onFrame({ ...frame }), t);
  });
}
