import { ref, reactive } from 'vue';
import { sendUserMessage } from '../mock/mockStreamApi';

export const chatSegments = ref<string[]>([]);
export const artifactData = reactive<Record<string, any>>({});

export function useStreamHub() {
  function sendMessage(text: string) {
    // Add user message as a new bubble
    chatSegments.value.push(text);
    // Add an empty assistant bubble for the response
    chatSegments.value.push('');
    const assistantIdx = chatSegments.value.length - 1;
    // Start streaming assistant response
    sendUserMessage(text, (frame) => {
      if (frame.channel === 'chat') {
        if (frame.delta !== undefined) {
          // Append delta to the last assistant bubble
          chatSegments.value[assistantIdx] += frame.delta;
        }
        if (frame.isFinal) {
          // Message streaming is complete
        }
      } else if (frame.channel === 'artifact' && frame.artifactId) {
        const key = frame.artifactId;
        if (frame.op === 'replace') artifactData[key] = frame.value;
        else if (frame.op === 'append' && Array.isArray(artifactData[key])) artifactData[key].push(...frame.value);
        else if (frame.op === 'remove') delete artifactData[key];
      }
    });
  }

  function resetAll() {
    chatSegments.value = [];
    for (const k in artifactData) delete artifactData[k];
  }

  return { chatSegments, artifactData, sendMessage, resetAll };
}
