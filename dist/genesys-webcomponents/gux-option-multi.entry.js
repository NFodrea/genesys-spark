import { r as registerInstance, e as createEvent, h, j as Host, g as getElement } from './index-f583fcde.js';
import { r as randomHTMLId } from './random-html-id-8e3f658c.js';
import { b as buildI18nForComponent } from './index-0998c803.js';
import './get-closest-element-1597503c.js';

const removeCustomElementInstructions = ", unselecting this custom option will remove it from the list";
const translationResources = {
	removeCustomElementInstructions: removeCustomElementInstructions
};

const guxOptionMultiCss = "gux-option-multi{box-sizing:border-box;display:flex;min-height:32px;padding:6px 12px;color:#2e394c;word-wrap:break-word;cursor:pointer}gux-option-multi .gux-option::before{position:relative;top:2px;display:inline-block;width:13px;height:13px;margin-right:7px;content:'';background-color:white;background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd' viewBox='1 1 13 13'%3E%3Cpath d='M11 2.5H4C3.17157 2.5 2.5 3.17157 2.5 4V11C2.5 11.8284 3.17157 12.5 4 12.5H11C11.8284 12.5 12.5 11.8284 12.5 11V4C12.5 3.17157 11.8284 2.5 11 2.5ZM4 1C2.34315 1 1 2.34315 1 4V11C1 12.6569 2.34315 14 4 14H11C12.6569 14 14 12.6569 14 11V4C14 2.34315 12.6569 1 11 1H4Z' fill='%23596373' /%3E%3C/svg%3E\");border-radius:30%}gux-option-multi.gux-disabled{pointer-events:none;cursor:default;opacity:0.5}gux-option-multi.gux-selected .gux-option::before{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd' viewBox='1 1 13 13'%3E%3Cpath d='M4 1H11C11.7956 1 12.5587 1.31607 13.1213 1.87868C13.6839 2.44129 14 3.20435 14 4V11C14 11.7956 13.6839 12.5587 13.1213 13.1213C12.5587 13.6839 11.7956 14 11 14H4C3.20435 14 2.44129 13.6839 1.87868 13.1213C1.31607 12.5587 1 11.7956 1 11V4C1 3.20435 1.31607 2.44129 1.87868 1.87868C2.44129 1.31607 3.20435 1 4 1ZM5.57018 10.4198C5.7051 10.5547 5.87599 10.6177 6.04689 10.6177C6.22678 10.6177 6.39767 10.5457 6.52359 10.4198L11.7944 5.14905C12.0552 4.88821 12.0552 4.45647 11.7944 4.19563C11.5335 3.93479 11.1018 3.93479 10.841 4.19563L6.04689 8.9897L4.14905 7.08286C3.88821 6.82202 3.45647 6.82202 3.19563 7.08286C2.93479 7.3437 2.93479 7.77544 3.19563 8.03628L5.57018 10.4198Z' fill='%232a60c8' /%3E%3C/svg%3E\")}gux-option-multi.gux-active,gux-option-multi.gux-hovered:not([disabled]){color:#fdfdfd;background:#2a60c8}gux-option-multi.gux-active.gux-selected .gux-option::before,gux-option-multi.gux-hovered:not([disabled]).gux-selected .gux-option::before{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd' viewBox='1 1 13 13'%3E%3Cpath d='M5.57018 10.4198C5.7051 10.5547 5.87599 10.6177 6.04689 10.6177C6.22678 10.6177 6.39767 10.5457 6.52359 10.4198L11.7944 5.14905C12.0552 4.88821 12.0552 4.45647 11.7944 4.19563C11.5335 3.93479 11.1018 3.93479 10.841 4.19563L6.04689 8.9897L4.14905 7.08286C3.88821 6.82202 3.45647 6.82202 3.19563 7.08286C2.93479 7.3437 2.93479 7.77544 3.19563 8.03628L5.57018 10.4198Z' fill='%232a60c8' /%3E%3C/svg%3E\")}gux-option-multi.gux-active:not(.gux-selected) .gux-option::before,gux-option-multi.gux-hovered:not([disabled]):not(.gux-selected) .gux-option::before{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd' viewBox='1 1 13 13'%3E%3Cpath d='M11 2.5H4C3.17157 2.5 2.5 3.17157 2.5 4V11C2.5 11.8284 3.17157 12.5 4 12.5H11C11.8284 12.5 12.5 11.8284 12.5 11V4C12.5 3.17157 11.8284 2.5 11 2.5ZM4 1C2.34315 1 1 2.34315 1 4V11C1 12.6569 2.34315 14 4 14H11C12.6569 14 14 12.6569 14 11V4C14 2.34315 12.6569 1 11 1H4Z' fill='none' /%3E%3C/svg%3E\")}gux-option-multi.gux-filtered{display:none}gux-option-multi .gux-screenreader{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}";

const GuxOptionMulti = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.guxremovecustomoption = createEvent(this, "guxremovecustomoption", 7);
    this.internalselectcustomoption = createEvent(this, "internalselectcustomoption", 7);
    this.value = undefined;
    this.active = false;
    this.selected = false;
    this.disabled = false;
    this.filtered = false;
    this.hovered = false;
    this.custom = false;
  }
  onmouseenter() {
    this.hovered = true;
  }
  onMouseleave() {
    this.hovered = false;
  }
  emitRemoveCustomOption() {
    if (!this.selected && this.custom) {
      this.guxremovecustomoption.emit();
    }
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.root.id = this.root.id || randomHTMLId('gux-option-multi');
    if (this.custom) {
      this.internalselectcustomoption.emit(this.value);
    }
  }
  renderCustomOptionInstructions() {
    if (this.custom) {
      return (h("span", { class: "gux-screenreader" }, this.i18n('removeCustomElementInstructions')));
    }
  }
  render() {
    return (h(Host, { role: "option", class: {
        'gux-active': this.active,
        'gux-disabled': this.disabled,
        'gux-filtered': this.filtered,
        'gux-hovered': this.hovered,
        'gux-selected': this.selected
      }, "aria-selected": this.selected.toString(), "aria-disabled": this.disabled.toString() }, h("div", { "gux-slot-container": true, class: "gux-option" }, h("slot", null)), this.renderCustomOptionInstructions()));
  }
  get root() { return getElement(this); }
  static get watchers() { return {
    "selected": ["emitRemoveCustomOption"]
  }; }
};
GuxOptionMulti.style = guxOptionMultiCss;

export { GuxOptionMulti as gux_option_multi };
