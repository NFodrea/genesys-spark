import { getClosestElement } from 'genesys-spark-utils/get-closest-element';
import { GuxRichTextEditorActionTypes } from './gux-rich-text-editor-action/gux-rich-text-editor-action.types';

export function hasDisabledParent(root: HTMLElement): boolean {
  const getParent = getClosestElement(
    root,
    'gux-rich-text-editor-beta'
  ) as HTMLGuxRichTextEditorBetaElement;

  return getParent?.disabled;
}

export function returnActionTypeIcon(
  action: GuxRichTextEditorActionTypes
): string {
  switch (action) {
    case 'bold':
      return 'fa/bold-regular';
    case 'italic':
      return 'fa/italic-regular';
    case 'underline':
      return 'fa/underline-regular';
    case 'strike':
      return 'fa/strikethrough-regular';
    case 'codeblock':
      return 'fa/code-regular';
    case 'blockQuote':
      return 'fa/quote-right-regular';
    case 'orderedList':
      return 'fa/list-ol-regular';
    case 'bulletList':
      return 'fa/list-ul-regular';
    case 'clearFormatting':
      return 'fa/eraser-regular';
    case 'undo':
      return 'custom/undo-regular';
    case 'redo':
      return 'custom/redo-regular';
    case 'delete':
      return 'fa/trash-regular';
    default:
      return 'fa/bold-regular';
  }
}

export function getActionsFromGroups(
  selector: string,
  hiddenClass: string
): string[] {
  const actionGroup = this.root.querySelector(selector);

  if (actionGroup && actionGroup.classList.contains(hiddenClass)) {
    return Array.from(
      actionGroup.querySelectorAll('gux-rich-text-editor-action')
    ).map(actionElement =>
      (actionElement as HTMLGuxRichTextEditorActionElement).getAttribute(
        'action'
      )
    );
  }

  return [];
}

export function getActionsFromGroup(
  root: HTMLElement,
  selector: string,
  hiddenClass: string
): string[] {
  const actionGroup = root.querySelector(selector);
  const actions = [];

  if (actionGroup && actionGroup.classList.contains(hiddenClass)) {
    const children = actionGroup.children;
    Array.from(children).forEach(child => {
      if (child.tagName === 'GUX-RICH-TEXT-EDITOR-ACTION') {
        const action = (child as HTMLElement).getAttribute('action');
        if (action) {
          actions.push(action);
        }
      } else if (child.tagName === 'GUX-RICH-TEXT-EDITOR-ACTION-RICH-STYLE') {
        const styleListItems = child.querySelectorAll(
          'gux-rich-style-list-item'
        );
        styleListItems.forEach(item => {
          const value = (item as HTMLElement).getAttribute('value');
          if (value) {
            actions.push(value);
          }
        });
      } else if (
        child.tagName === 'GUX-RICH-TEXT-EDITOR-ACTION-TEXT-HIGHLIGHT'
      ) {
        const textHighlightListItems = child.querySelectorAll(
          'gux-rich-highlight-list-item'
        );
        textHighlightListItems.forEach(item => {
          const highlight = (item as HTMLElement).getAttribute('highlight');
          if (highlight) {
            actions.push(highlight);
          }
        });
      }
    });
  }

  return actions;
}
