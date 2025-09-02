import productData from './mockdata.json';
import type { StreamFrame, FileDownload, TableData, MediaItem } from '../types';
import { APP_CONFIG } from '../config';

const sampleFiles: FileDownload[] = [
  { name: 'catalog.pdf', url: 'https://example.com/catalog.pdf', size: '2.3 MB', type: 'PDF' },
  { name: 'spec-sheet.pdf', url: 'https://example.com/spec-sheet.pdf', size: '1.8 MB', type: 'PDF' }
];

const sampleTable: TableData[] = [
  { Name: 'Alice', Age: 30, Department: 'Engineering' },
  { Name: 'Bob', Age: 25, Department: 'Design' },
  { Name: 'Carol', Age: 28, Department: 'Product' }
];

const sampleMedia: MediaItem[] = [
  { 
    type: 'video', 
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    title: 'Demo Video',
    description: 'A sample video for demonstration'
  }
];



const getRandomProducts = (n: number) => {
  const arr = [...productData];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
};

export function sendUserMessage(userText: string, onFrame: (f: StreamFrame) => void): void {
  const scenario: Array<{ delayMs: number; frame: StreamFrame }> = [];
  const speed = APP_CONFIG.chat.typingSpeed.default;

  // All scenarios begin with "Here" for demo consistency
  scenario.push({ delayMs: 0, frame: { channel: 'chat', delta: 'Here ' } });

  const lower = userText.toLowerCase();

  if (lower.includes('file')) {
    scenario.push(
      { delayMs: speed + 40, frame: { channel: 'chat', delta: 'are ' } },
      { delayMs: speed, frame: { channel: 'chat', delta: 'the ' } },
      { delayMs: speed + 20, frame: { channel: 'chat', delta: 'files ' } },
      { delayMs: speed, frame: { channel: 'chat', delta: 'you ' } },
      { delayMs: speed - 20, frame: { channel: 'chat', delta: 'requested.' } },
      { delayMs: speed - 60, frame: { channel: 'chat', delta: '', isFinal: true } },
      { delayMs: speed, frame: { channel: 'artifact', artifactId: 'file_list', op: 'replace', value: sampleFiles } }
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

  } else if (lower.includes('table')) {
    scenario.push(
      { delayMs: 160, frame: { channel: 'chat', delta: 'is ' } },
      { delayMs: 120, frame: { channel: 'chat', delta: 'your ' } },
      { delayMs: 140, frame: { channel: 'chat', delta: 'requested ' } },
      { delayMs: 120, frame: { channel: 'chat', delta: 'table.' } },
      { delayMs: 60,  frame: { channel: 'chat', delta: '', isFinal: true } },
      { delayMs: 120, frame: { channel: 'artifact', artifactId: 'table_data', op: 'replace', value: sampleTable } }
    );
  } else if (lower.includes('video')) {
    scenario.push(
      { delayMs: 160, frame: { channel: 'chat', delta: 'is ' } },
      { delayMs: 120, frame: { channel: 'chat', delta: 'your ' } },
      { delayMs: 140, frame: { channel: 'chat', delta: 'video.' } },
      { delayMs: 60,  frame: { channel: 'chat', delta: '', isFinal: true } },
      { delayMs: 120, frame: { channel: 'artifact', artifactId: 'media_gallery', op: 'replace', value: sampleMedia } }
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
