function simulateNativeEvent(targetElement, nativeEventName) {
  switch (nativeEventName) {
    case 'change':
      return targetElement.dispatchEvent(new InputEvent('change', {
        bubbles: true
      }));
    case 'input':
      return targetElement.dispatchEvent(new InputEvent('input', {
        bubbles: true
      }));
  }
}

export { simulateNativeEvent as s };
