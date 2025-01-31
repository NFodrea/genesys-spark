import {
  Component,
  h,
  JSX,
  Element,
  Prop,
  readTask,
  State,
  Event,
  EventEmitter
} from '@stencil/core';
import { OnResize } from '@utils/decorator/on-resize';
import { hasSlot } from '@utils/dom/has-slot';
import { trackComponent } from '@utils/tracking/usage';
import { getActionsFromGroup } from './gux-rich-text-editor.service';
import { buildI18nForComponent, GetI18nValue } from 'i18n';
import translationResources from './gux-rich-text-editor-action/i18n/en.json';

/**
 * @slot typographical-emphasis - Slot for typographical actions.
 * @slot text-styling - Slot for text-styling actions.
 * @slot lists-indentation - Slot for lists and indentation actions.
 * @slot inserting - Slot for inserting actions.
 * @slot global-action - Slot for global action.
 * @slot editor - Slot for the editor.
 */

@Component({
  tag: 'gux-rich-text-editor-beta',
  styleUrl: 'gux-rich-text-editor.scss',
  shadow: true
})
export class GuxRichTextEditor {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop()
  disabled: boolean = false;

  @State()
  typographicalEmphasisActions: string[] = [];

  @State()
  textStylingActions: string[] = [];

  @State()
  listsAndIndentationActions: string[] = [];

  @State()
  insertingActions: string[] = [];

  // This event is emitted when an action has been selected from the menu in the shadowDOM.
  @Event({ composed: true })
  guxToggleAction: EventEmitter<string>;

  @OnResize()
  checkResponsiveLayout(): void {
    readTask(() => {
      this.handleOverflow();
      this.getHiddenActions();
    });
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  componentDidLoad(): void {
    this.checkResponsiveLayout();
  }

  componentDidUpdate(): void {
    this.handleOverflow();
  }

  private isOverFlowing(): boolean {
    const container = this.root?.shadowRoot.querySelector(
      '.gux-rich-text-editor-toolbar-container'
    );
    // A group of gux-rich-text-editor-action-group.
    const children = Array.from(container.children);
    // Calculate the total width of all children excluding hidden (gux-rich-text-editor-action-groups).
    const totalWidth = children
      .filter(child => !child.classList.contains('gux-hidden'))
      .reduce((sum, child) => sum + child.clientWidth, 0);

    return totalWidth > container.clientWidth;
  }

  private handleOverflow(): void {
    const actionGroups = Array.from(
      this.root.querySelectorAll('gux-rich-text-editor-action-group')
    );

    // Hide last visible action group until there's no overflow.
    while (this.isOverFlowing()) {
      let hidden = false;
      for (let i = actionGroups.length - 1; i >= 0; i--) {
        if (!actionGroups[i].classList.contains('gux-hidden')) {
          actionGroups[i].classList.add('gux-hidden');
          hidden = true;
          break;
        }
      }
      // If no more action groups to hide, exit loop
      if (!hidden) {
        break;
      }
    }

    // Show previously hidden groups if space is available
    for (const group of actionGroups) {
      if (group.classList.contains('gux-hidden')) {
        group.classList.remove('gux-hidden');

        // If it causes overflow again, re-hide the group and stop the loop
        if (this.isOverFlowing()) {
          group.classList.add('gux-hidden');
          break;
        }
      }
    }
  }
  private getHiddenActions(): void {
    this.typographicalEmphasisActions = getActionsFromGroup(
      this.root,
      'gux-rich-text-editor-action-group[slot="typographical-emphasis"]',
      'gux-hidden'
    );

    this.listsAndIndentationActions = getActionsFromGroup(
      this.root,
      'gux-rich-text-editor-action-group[slot="lists-indentation"]',
      'gux-hidden'
    );

    this.textStylingActions = getActionsFromGroup(
      this.root,
      'gux-rich-text-editor-action-group[slot="text-styling"]',
      'gux-hidden'
    );

    this.insertingActions = getActionsFromGroup(
      this.root,
      'gux-rich-text-editor-action-group[slot="inserting"]',
      'gux-hidden'
    );
  }

  private renderTextEditorMenu(): JSX.Element {
    const allActions = [
      ...this.textStylingActions,
      ...this.typographicalEmphasisActions,
      ...this.listsAndIndentationActions,
      ...this.insertingActions
    ];

    // Prefixes to identify in the actions array so these can be used for sub-lists.
    const richStylePrefix = 'rich-style-';
    const highlightPrefix = 'highlight-';

    const filteredActions: string[] = [];
    // Arrays to store rich style and highlight actions.
    const richStyleActions: string[] = [];
    const highlightActions: string[] = [];
    // Filter out the rich style and highlight actions from the filtered array an assign to their own array.
    for (const action of allActions) {
      if (action.startsWith(richStylePrefix)) {
        richStyleActions.push(action.slice(richStylePrefix.length));
      } else if (action.startsWith(highlightPrefix)) {
        highlightActions.push(action.slice(highlightPrefix.length));
      } else {
        filteredActions.push(action);
      }
    }

    if (allActions.length > 0) {
      return (
        <gux-rich-text-editor-action-rich-style value="menu" is-menu="true">
          {filteredActions.map((action, index) => {
            return (
              <gux-rich-style-list-item
                onClick={() => this.guxToggleAction.emit(action)}
                key={index}
                value={action}
              >
                {this.i18n(action) || action}
              </gux-rich-style-list-item>
            );
          })}
          {richStyleActions.length > 0 && (
            <gux-rich-text-editor-sub-list label={this.i18n('richStyle')}>
              {richStyleActions.map((action, index) => {
                // Remove the html tags from the text content. HTML tags are needed for the innerHTML attribute set so the styles are mimicked.
                const actionText = action.replace(/<\/?[^>]+(>|$)/g, '');
                return (
                  <gux-rich-style-list-item
                    onClick={() => this.guxToggleAction.emit(actionText)}
                    key={index}
                    value={actionText}
                    innerHTML={action}
                  ></gux-rich-style-list-item>
                );
              })}
            </gux-rich-text-editor-sub-list>
          )}
          {highlightActions.length > 0 && (
            <gux-rich-text-editor-sub-list label={this.i18n('textHighlight')}>
              {highlightActions.map((action, index) => {
                return (
                  <gux-rich-style-list-item
                    onClick={() => this.guxToggleAction.emit(action)}
                    key={index}
                    value={action}
                  >
                    {this.i18n(action) || action}
                  </gux-rich-style-list-item>
                );
              })}
            </gux-rich-text-editor-sub-list>
          )}
        </gux-rich-text-editor-action-rich-style>
      ) as JSX.Element;
    }
  }

  private renderSlot(
    slotName: string,
    containerClass: string
  ): JSX.Element | null {
    if (hasSlot(this.root, slotName)) {
      return (
        <div class={containerClass}>
          <slot name={slotName}></slot>
        </div>
      ) as JSX.Element;
    }
    return null;
  }

  private renderTypographicalEmphasis(): JSX.Element | null {
    return this.renderSlot(
      'typographical-emphasis',
      'gux-typographical-emphasis-container'
    );
  }

  private renderTextStyling(): JSX.Element | null {
    return this.renderSlot('text-styling', 'gux-text-styling-container');
  }

  private renderListsIndentation(): JSX.Element | null {
    return this.renderSlot(
      'lists-indentation',
      'gux-lists-indentation-container'
    );
  }

  private renderInserting(): JSX.Element | null {
    return this.renderSlot('inserting', 'gux-inserting-container');
  }

  private renderGlobalAction(): JSX.Element | null {
    return this.renderSlot('global-action', 'gux-global-action-container');
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-rich-text-editor-container': true,
          'gux-disabled': this.disabled
        }}
      >
        <div class="gux-rich-text-editor-toolbar-container">
          {this.renderTypographicalEmphasis()}
          {this.renderTextStyling()}
          {this.renderListsIndentation()}
          {this.renderInserting()}
          {this.renderTextEditorMenu()}
          {this.renderGlobalAction()}
        </div>
        <slot name="editor"></slot>
      </div>
    ) as JSX.Element;
  }
}
