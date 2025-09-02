import { ref, reactive, readonly, computed } from 'vue';
import { sendUserMessage } from '../mock/mockStreamApi';
import type { ArtifactData, StreamFrame, LoadingState } from '../types';
import { APP_CONFIG } from '../config';
import { globalErrorHandler } from './useErrorHandler';
import { useMemoized } from './usePerformance';

// Encapsulated state - no longer exported globally for components
const chatSegments = ref<string[]>([]);
const artifactData = reactive<ArtifactData>({});
const streamingState = ref<LoadingState>('idle');
const currentStreamId = ref<string | null>(null);

// Export for backwards compatibility with tests
export { chatSegments, artifactData };

export function useStreamHub() {
  // Memoized artifact processing for performance
  const memoizedArtifactHandler = useMemoized(
    (frame: StreamFrame) => handleArtifactFrame(frame),
    (frame) => `${frame.artifactId}-${frame.op}-${JSON.stringify(frame.value)}`
  );

  function sendMessage(text: string): void {
    const streamId = generateStreamId();
    currentStreamId.value = streamId;
    streamingState.value = 'loading';

    try {
      // Clear previous artifacts
      clearArtifacts();
      
      // Add user message as a new bubble
      chatSegments.value.push(text);
      
      // Add an empty assistant bubble for the response
      chatSegments.value.push('');
      const assistantIdx = chatSegments.value.length - 1;
      
      // Start streaming assistant response
      sendUserMessage(text, (frame: StreamFrame) => {
        // Ignore frames from previous streams
        if (currentStreamId.value !== streamId) return;

        try {
          if (frame.channel === 'chat') {
            handleChatFrame(frame, assistantIdx);
          } else if (frame.channel === 'artifact' && frame.artifactId) {
            memoizedArtifactHandler(frame);
          }
        } catch (error) {
          globalErrorHandler.handleError(error, 'STREAM_PROCESSING_ERROR');
          streamingState.value = 'error';
        }
      });
    } catch (error) {
      globalErrorHandler.handleError(error, 'STREAM_SEND_ERROR');
      streamingState.value = 'error';
    }
  }

  function handleChatFrame(frame: StreamFrame, assistantIdx: number): void {
    if (frame.delta !== undefined) {
      // Append delta to the last assistant bubble
      chatSegments.value[assistantIdx] += frame.delta;
    }
    
    if (frame.isFinal) {
      // Message streaming is complete - enforce max history
      enforceMaxHistory();
      streamingState.value = 'success';
    }
  }

  function handleArtifactFrame(frame: StreamFrame): void {
    const key = frame.artifactId as keyof ArtifactData;
    if (!key) return;

    if (frame.op === 'replace') {
      (artifactData as any)[key] = frame.value;
    } else if (frame.op === 'append' && Array.isArray(artifactData[key])) {
      (artifactData[key] as any[]).push(...frame.value);
    } else if (frame.op === 'remove') {
      delete (artifactData as any)[key];
    }
  }

  function clearArtifacts(): void {
    const keys = Object.keys(artifactData) as (keyof ArtifactData)[];
    keys.forEach(key => delete (artifactData as any)[key]);
  }

  function enforceMaxHistory(): void {
    const maxHistory = APP_CONFIG.chat.maxHistory;
    if (chatSegments.value.length > maxHistory) {
      chatSegments.value.splice(0, chatSegments.value.length - maxHistory);
    }
  }

  function resetAll(): void {
    chatSegments.value = [];
    clearArtifacts();
    streamingState.value = 'idle';
    currentStreamId.value = null;
  }

  function generateStreamId(): string {
    return `stream-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Return computed refs for reactive access
  return { 
    chatSegments: readonly(chatSegments), 
    artifactData: readonly(artifactData),
    streamingState: computed(() => streamingState.value),
    isStreaming: computed(() => streamingState.value === 'loading'),
    sendMessage, 
    resetAll 
  };
}
