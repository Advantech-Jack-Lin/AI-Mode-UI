import { ref, onMounted, onUnmounted } from 'vue';

export function useKeyboard() {
  const isShiftPressed = ref(false);
  const isCtrlPressed = ref(false);
  const isAltPressed = ref(false);

  function handleKeydown(event: KeyboardEvent) {
    isShiftPressed.value = event.shiftKey;
    isCtrlPressed.value = event.ctrlKey || event.metaKey;
    isAltPressed.value = event.altKey;
  }

  function handleKeyup(event: KeyboardEvent) {
    isShiftPressed.value = event.shiftKey;
    isCtrlPressed.value = event.ctrlKey || event.metaKey;
    isAltPressed.value = event.altKey;
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('keyup', handleKeyup);
  });

  return {
    isShiftPressed,
    isCtrlPressed,
    isAltPressed
  };
}

export function useShortcuts(shortcuts: Record<string, () => void>) {
  function handleKeydown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    const ctrlOrCmd = event.ctrlKey || event.metaKey;
    const shift = event.shiftKey;
    const alt = event.altKey;

    // Build shortcut key
    let shortcutKey = '';
    if (ctrlOrCmd) shortcutKey += 'ctrl+';
    if (shift) shortcutKey += 'shift+';
    if (alt) shortcutKey += 'alt+';
    shortcutKey += key;

    if (shortcuts[shortcutKey]) {
      event.preventDefault();
      shortcuts[shortcutKey]();
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
  });

  return {
    addShortcut: (key: string, handler: () => void) => {
      shortcuts[key] = handler;
    }
  };
}

export function useFocusManagement() {
  const focusableElements = ref<HTMLElement[]>([]);

  function getFocusableElements(container?: HTMLElement): HTMLElement[] {
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    const elements = Array.from(
      (container || document).querySelectorAll(selector)
    ) as HTMLElement[];

    return elements.filter(el => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
  }

  function trapFocus(container: HTMLElement) {
    const elements = getFocusableElements(container);
    focusableElements.value = elements;

    if (elements.length === 0) return;

    const firstElement = elements[0];
    const lastElement = elements[elements.length - 1];

    function handleTabKey(event: KeyboardEvent) {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    container.addEventListener('keydown', handleTabKey);

    // Focus first element
    firstElement.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }

  function restoreFocus(element: HTMLElement) {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  }

  return {
    focusableElements,
    getFocusableElements,
    trapFocus,
    restoreFocus
  };
}