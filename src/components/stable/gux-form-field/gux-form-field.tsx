import { Component, Element, h, JSX, Prop, State } from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';

/**
 * @slot input - Required slot for input tag
 * @slot label - Required slot for label tag
 */
@Component({
  styleUrl: 'gux-form-field.less',
  tag: 'gux-form-field'
})
export class GuxFormField {
  private input: HTMLInputElement;
  private label: HTMLLabelElement;

  @Element()
  private root: HTMLElement;

  @Prop()
  clearable: boolean;

  @Prop()
  displayUnits: string;

  @Prop()
  valueInTooltip: boolean;

  @State()
  private slottedElementType: string = 'input' || 'select' || 'textarea';

  @State()
  private labelPosition: 'above' | 'beside' = 'above';

  componentWillLoad() {
    this.input = this.root.querySelector(
      'input[slot="input"], select[slot="input"], textarea[slot="input"]'
    );
    this.label = this.root.querySelector('label[slot="label"]');
    const type = this.input.getAttribute('type');
    this.slottedElementType = this.input.tagName.toLowerCase();

    // stops the html5 validation styling
    this.input.addEventListener('invalid', event => {
      event.preventDefault();
    });

    let variant = this.slottedElementType;
    if (this.slottedElementType === 'input') {
      variant = this.slottedElementType.concat('-').concat(type);
    }

    trackComponent(this.root, { variant });
  }

  componentWillRender() {
    if (this.label) {
      this.labelPosition = this.label.offsetWidth < 40 ? 'beside' : 'above';
    }
  }

  private getInputCheckbox(hasError: boolean): JSX.Element {
    return (
      <div class="gux-label-and-input-and-error-container">
        <div class="gux-label-and-input-container">
          <gux-input-checkbox class={{ 'gux-input-error': hasError }}>
            <slot name="input" />
            <slot name="label" />
          </gux-input-checkbox>
        </div>
        <div class="gux-error">
          {hasError ? (
            <gux-icon class="error-icon" decorative iconName="ic-alert-octo" />
          ) : null}
          <slot name="error" />
        </div>
      </div>
    );
  }

  private getInputRadio(): JSX.Element {
    return (
      <gux-input-radio>
        <slot name="input" />
        <slot name="label" />
      </gux-input-radio>
    );
  }

  private getInputColor(hasError: boolean): JSX.Element {
    return (
      <div class="gux-label-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <slot name="label" slot="label" />
          <gux-input-color
            class={{
              'gux-input-error': hasError
            }}
          >
            <slot name="input" />
          </gux-input-color>
        </div>
        <div class="gux-error">
          {hasError ? (
            <gux-icon class="error-icon" decorative iconName="ic-alert-octo" />
          ) : null}
          <slot name="error" />
        </div>
      </div>
    );
  }

  private getInputRange(
    displayUnits: string,
    valueInTooltip: boolean
  ): JSX.Element {
    return (
      <div class="guxlabel-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <slot name="label" slot="label" />
          <gux-input-range
            display-units={displayUnits}
            value-in-tooltip={valueInTooltip}
          >
            <slot name="input" />
          </gux-input-range>
        </div>
      </div>
    );
  }

  private getInputNumber(clearable: boolean, hasError: boolean): JSX.Element {
    return (
      <div class="gux-label-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <slot name="label" slot="label" />
          <gux-input-number
            class={{
              'gux-input-error': hasError
            }}
            slot="input"
            clearable={clearable}
          >
            <slot name="input" />
          </gux-input-number>
        </div>
        <div class="gux-error">
          {hasError ? (
            <gux-icon class="error-icon" decorative iconName="ic-alert-octo" />
          ) : null}
          <slot name="error" />
        </div>
      </div>
    );
  }

  private getInputTextLike(clearable: boolean, hasError: boolean): JSX.Element {
    return (
      <div class="gux-label-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <slot name="label" slot="label" />
          <gux-input-text-like
            class={{
              'gux-input-error': hasError
            }}
            slot="input"
            clearable={clearable}
          >
            <slot name="input" />
          </gux-input-text-like>
        </div>
        <div class="gux-error">
          {hasError ? (
            <gux-icon class="error-icon" decorative iconName="ic-alert-octo" />
          ) : null}
          <slot name="error" />
        </div>
      </div>
    );
  }

  private getInputTextArea(hasError: boolean): JSX.Element {
    return (
      <div class="gux-label-and-input-and-error-container">
        <div class={`gux-label-and-input-container gux-${this.labelPosition}`}>
          <slot name="label" slot="label" />
          <gux-input-textarea
            class={{
              'gux-input-error': hasError
            }}
            slot="input"
          >
            <slot name="input" />
          </gux-input-textarea>
        </div>
        <div class="gux-error">
          {hasError ? (
            <gux-icon class="error-icon" decorative iconName="ic-alert-octo" />
          ) : null}
          <slot name="error" />
        </div>
      </div>
    );
  }

  render(): JSX.Element {
    const type = this.input.getAttribute('type');
    const hasError = this.hasErrorSlot();
    switch (this.slottedElementType) {
      case 'input':
        switch (type) {
          case 'checkbox':
            return this.getInputCheckbox(hasError);
          case 'radio':
            return this.getInputRadio();
          case 'color':
            return this.getInputColor(hasError);
          case 'range':
            return this.getInputRange(this.displayUnits, this.valueInTooltip);
          case 'email':
          case 'password':
          case 'text':
            return this.getInputTextLike(this.clearable, hasError);
          case 'number':
            return this.getInputNumber(this.clearable, hasError);
          case 'search':
            return this.getInputTextLike(false, hasError);
          default:
            return (
              <div>
                <slot name="label" />
                <slot name="input" />
                <slot name="error" />
              </div>
            );
        }
      case 'select':
        return this.getInputTextLike(this.clearable, hasError);
      case 'textarea':
        return this.getInputTextArea(hasError);
      default:
        return (
          <div>
            <slot name="label" />
            <slot name="input" />
            <slot name="error" />
          </div>
        );
    }
  }

  private hasErrorSlot(): boolean {
    return !!this.root.querySelector('span[slot="error"]');
  }
}
