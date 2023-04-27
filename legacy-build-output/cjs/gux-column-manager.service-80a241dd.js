'use strict';

const clamp = require('./clamp-1bb96117.js');
const simulateNativeEvent = require('./simulate-native-event-fe3e62da.js');

function getNewOrder(root, { oldIndex, newIndex }) {
  const order = Array.from(root.children).map(x => x.orderId);
  const [element] = order.splice(oldIndex, 1);
  order.splice(newIndex, 0, element);
  return order;
}
function setKeyboardReorderPositionIndicator(root, { oldIndex, newIndex }) {
  getColumnManagerItems(root).forEach((item, index) => {
    if (index !== newIndex) {
      item.removeAttribute('gs-reorder-indicator');
    }
    else {
      const position = newIndex < oldIndex ? 'above' : 'below';
      item.setAttribute('gs-reorder-indicator', position);
    }
  });
}
function getNewKeyboardOrderChange(root, currentKeyboardOrderChange, delta) {
  const newIndex = clamp.clamp(currentKeyboardOrderChange.newIndex + delta, 0, Array.from(root.children).length - 1);
  return Object.assign({}, currentKeyboardOrderChange, { newIndex });
}
function getEmptyKeyboardOrderChange() {
  return { oldIndex: null, newIndex: null };
}
function getIndexInParent(target) {
  return Array.from(target.parentNode.children).indexOf(target);
}
function setAllCheckboxInputs(root, checked) {
  getCheckboxInputs(root).forEach(checkboxInput => {
    if (checkboxInput.checked !== checked) {
      checkboxInput.checked = checked;
      simulateNativeEvent.simulateNativeEvent(checkboxInput, 'input');
      simulateNativeEvent.simulateNativeEvent(checkboxInput, 'change');
    }
  });
}
function setMainCheckboxElementCheckedState(root, mainCheckboxElement) {
  const { count, total } = getSelectedColumnCount(root);
  if (count === 0) {
    mainCheckboxElement.indeterminate = false;
    mainCheckboxElement.checked = false;
  }
  else if (count === total) {
    mainCheckboxElement.indeterminate = false;
    mainCheckboxElement.checked = true;
  }
  else {
    mainCheckboxElement.indeterminate = true;
  }
}
function getSelectedColumnCount(root) {
  const total = getCheckboxInputs(root).length;
  const count = getCheckedCheckboxInputs(root).length;
  return { count, total };
}
function setHighlights(root, searchElement, currentMatch = 1) {
  return getColumnManagerItems(root).reduce((acc, item) => {
    const searchString = searchElement.value.toLowerCase();
    if (searchString &&
      item.textContent.toLowerCase().includes(searchString)) {
      const matchCount = acc.matchCount + 1;
      void item.guxSetHighlight(searchElement.value, matchCount === currentMatch);
      return { matchCount, currentMatch };
    }
    void item.guxSetHighlight();
    return acc;
  }, { matchCount: 0, currentMatch: 0 });
}
function getCheckboxInputs(root) {
  return Array.from(root.querySelectorAll('input[type=checkbox]'));
}
function getCheckedCheckboxInputs(root) {
  const checkboxInputs = getCheckboxInputs(root);
  return checkboxInputs.filter(x => x.checked);
}
function getColumnManagerItems(root) {
  return Array.from(root.querySelectorAll('gux-column-manager-item'));
}

exports.getEmptyKeyboardOrderChange = getEmptyKeyboardOrderChange;
exports.getIndexInParent = getIndexInParent;
exports.getNewKeyboardOrderChange = getNewKeyboardOrderChange;
exports.getNewOrder = getNewOrder;
exports.getSelectedColumnCount = getSelectedColumnCount;
exports.setAllCheckboxInputs = setAllCheckboxInputs;
exports.setHighlights = setHighlights;
exports.setKeyboardReorderPositionIndicator = setKeyboardReorderPositionIndicator;
exports.setMainCheckboxElementCheckedState = setMainCheckboxElementCheckedState;
