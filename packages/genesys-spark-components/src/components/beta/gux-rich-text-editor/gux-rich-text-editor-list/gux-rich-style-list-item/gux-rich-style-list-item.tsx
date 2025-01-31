import {
  Component,
  h,
  Element,
  Prop,
  Host,
  Listen,
  Method
} from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { getClosestElement } from '@utils/dom/get-closest-element';

/**
 * @slot - text
 */

@Component({
  tag: 'gux-rich-style-list-item',
  styleUrl: 'gux-rich-style-list-item.scss',
  shadow: { delegatesFocus: true }
})
export class GuxRichStyleListItem {
  private richStyleElement: HTMLButtonElement;

  @Element()
  root: HTMLGuxRichStyleListItemElement;

  @Prop()
  disabled: boolean = false;

  // Reflect is used here so we can access the value in the light DOM for executing actions.
  @Prop({ reflect: true })
  value: string;

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocus(): Promise<void> {
    this.richStyleElement.focus();
  }

  @Listen('mouseup')
  onMouseUp(): void {
    this.focusParentList();
  }

  @Listen('mouseover')
  onMouseOver(): void {
    this.focusParentList();
  }

  private focusParentList(): void {
    const parentList = getClosestElement(
      'gux-rich-text-editor-list',
      this.root
    ) as HTMLElement;

    if (parentList && parentList.shadowRoot.activeElement === null) {
      this.root.blur();
      parentList.focus({
        preventScroll: true
      });
    }
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <Host role="listitem">
        <button
          type="button"
          ref={el => (this.richStyleElement = el)}
          tabIndex={-1}
          disabled={this.disabled}
        >
          <slot></slot>
        </button>
      </Host>
    ) as JSX.Element;
  }
}
