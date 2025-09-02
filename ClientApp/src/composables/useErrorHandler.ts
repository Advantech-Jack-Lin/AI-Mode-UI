import { ref, computed } from 'vue';
import type { AppError, AsyncState, LoadingState } from '../types';
import { APP_CONFIG } from '../config';

// Error handling composable
export function useErrorHandler() {
  const errors = ref<AppError[]>([]);

  function handleError(error: any, code?: string): void {
    const appError: AppError = {
      code: code || 'UNKNOWN_ERROR',
      message: error?.message || String(error),
      details: error
    };

    errors.value.push(appError);

    if (APP_CONFIG.dev.enableLogging) {
      console.error('Application Error:', appError);
    }

    // Auto-remove errors after 5 seconds
    setTimeout(() => {
      removeError(appError);
    }, 5000);
  }

  function removeError(error: AppError): void {
    const index = errors.value.indexOf(error);
    if (index > -1) {
      errors.value.splice(index, 1);
    }
  }

  function clearErrors(): void {
    errors.value = [];
  }

  return {
    errors: computed(() => errors.value),
    hasErrors: computed(() => errors.value.length > 0),
    handleError,
    removeError,
    clearErrors
  };
}

// Async state management composable
export function useAsyncState<T = any>(initialData?: T) {
  const state = ref<LoadingState>('idle');
  const data = ref<T | undefined>(initialData);
  const error = ref<AppError | undefined>();

  const asyncState = computed<AsyncState<T>>(() => ({
    state: state.value,
    data: data.value,
    error: error.value
  }));

  function setLoading(): void {
    state.value = 'loading';
    error.value = undefined;
  }

  function setSuccess(result: T): void {
    state.value = 'success';
    data.value = result;
    error.value = undefined;
  }

  function setError(err: AppError | string): void {
    state.value = 'error';
    error.value = typeof err === 'string' 
      ? { code: 'ASYNC_ERROR', message: err }
      : err;
  }

  function reset(): void {
    state.value = 'idle';
    data.value = initialData;
    error.value = undefined;
  }

  async function execute<TResult = T>(
    asyncFn: () => Promise<TResult>,
    retryCount: number = APP_CONFIG.errors.retryAttempts
  ): Promise<TResult | undefined> {
    setLoading();

    let lastError: any;
    
    for (let attempt = 0; attempt <= retryCount; attempt++) {
      try {
        const result = await Promise.race([
          asyncFn(),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Operation timeout')), APP_CONFIG.errors.timeoutMs)
          )
        ]);
        
        setSuccess(result as T);
        return result;
      } catch (err) {
        lastError = err;
        
        if (attempt < retryCount) {
          // Wait before retry with exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
          continue;
        }
      }
    }

    setError({
      code: 'ASYNC_EXECUTION_FAILED',
      message: `Failed after ${retryCount + 1} attempts: ${lastError?.message || 'Unknown error'}`,
      details: lastError
    });

    return undefined;
  }

  return {
    asyncState,
    isLoading: computed(() => state.value === 'loading'),
    isSuccess: computed(() => state.value === 'success'),
    isError: computed(() => state.value === 'error'),
    isIdle: computed(() => state.value === 'idle'),
    data: computed(() => data.value),
    error: computed(() => error.value),
    setLoading,
    setSuccess,
    setError,
    reset,
    execute
  };
}

// Global error handler instance
export const globalErrorHandler = useErrorHandler();