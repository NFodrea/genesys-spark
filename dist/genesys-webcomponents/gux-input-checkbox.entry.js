import { r as registerInstance, h } from './index-f583fcde.js';

const guxInputCheckboxCss = "gux-input-checkbox{display:block;color:#2e394c}gux-input-checkbox .gux-input-checkbox-container{position:relative;padding-left:24px;line-height:24px}gux-input-checkbox input{position:absolute;z-index:-1;opacity:0}gux-input-checkbox label{display:inline-block;font-size:12px}gux-input-checkbox label:hover{cursor:pointer}gux-input-checkbox label::after{position:absolute;top:4px;left:4px;display:block;width:16px;height:16px;content:'';border-radius:15%}gux-input-checkbox input:focus-within~label::after{box-shadow:0 0 3px 2px #aac9ff}gux-input-checkbox input:not(:checked)~label::after{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M11.138 2.467a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7m0-1h-7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3z' fill='%2377828f' /%3E%3C/svg%3E\")}gux-input-checkbox.gux-input-error input:not(:checked)~label::after{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M11.138 2.467a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7m0-1h-7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3z' fill='%23ea0b0b' /%3E%3C/svg%3E\")}gux-input-checkbox input:not(:checked):not(:disabled):not(:indeterminate)~label:hover::after{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M11.138 2.467a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7m0-1h-7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3z' fill='%232a60c8' /%3E%3C/svg%3E\")}gux-input-checkbox input:checked~label::after{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M11.138 1.467h-7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3zM6.8 11 3.638 7.941l.89-.932L6.8 9.2l3.947-3.861.891.932z' fill='%232a60c8' /%3E%3C/svg%3E\")}gux-input-checkbox input:indeterminate~label::after{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4.138 8.467h7v-1h-7zm7-7h-7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3zm2 10a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2z' fill='%232a60c8' /%3E%3C/svg%3E\")}gux-input-checkbox input:disabled~label::after,gux-input-checkbox input:disabled~label{cursor:not-allowed;opacity:0.5}";

const GuxInputCheckbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", { class: "gux-input-checkbox-container" }, h("slot", { name: "input" }), h("slot", { name: "label" })));
  }
};
GuxInputCheckbox.style = guxInputCheckboxCss;

export { GuxInputCheckbox as gux_input_checkbox };
