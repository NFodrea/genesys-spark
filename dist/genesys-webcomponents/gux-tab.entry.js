import { r as registerInstance, e as createEvent, h } from './index-f583fcde.js';

const guxTabCss = "gux-tabs[orientation='vertical']>gux-tab-list .gux-tab{display:flex;justify-content:flex-end;padding:12px 16px}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab.gux-active{padding-right:14px;border-right:2px solid #2a60c8}gux-tabs[orientation='vertical']>gux-tab-list .gux-tab:hover:not(.gux-active):not(.gux-disabled){padding-right:14px;border-right:2px solid #8a97ad}gux-tabs:not([orientation='vertical'])>gux-tab-list .gux-tab{box-sizing:border-box;padding-bottom:2px}gux-tabs:not([orientation='vertical'])>gux-tab-list .gux-tab.gux-active{padding-bottom:0;border-bottom:2px solid #2a60c8}gux-tabs:not([orientation='vertical'])>gux-tab-list .gux-tab:hover:not(.gux-active):not(.gux-disabled){padding-bottom:0;border-bottom:2px solid #8a97ad}gux-tabs:not([orientation='vertical'])>gux-tab-list .gux-tab gux-tooltip-title{margin:auto}gux-tabs[alignment='center']>gux-tab-list .gux-scrollable-section{justify-content:center}gux-tabs[alignment='full-width']>gux-tab-list .gux-scrollable-section{flex-grow:1}gux-tabs[alignment='full-width']>gux-tab-list gux-tab{width:100%;max-width:100%}gux-tabs[alignment='full-width']>gux-tab-list gux-tab .gux-tab{width:100%;max-width:100%}gux-tab{display:flex;max-width:160px}gux-tab .gux-tab{display:flex;align-items:center;width:100%;max-width:160px;height:40px;padding:0 16px;font-size:14px;color:#2e394c;cursor:pointer;background-color:#fff;border:none}gux-tab .gux-tab.gux-disabled{cursor:default}gux-tab .gux-tab.gux-disabled gux-tooltip-title{color:rgba(46, 57, 76, 0.5)}gux-tab .gux-tab:focus-visible{padding:0 13px 3px;border:3px solid #aac9ff;border-radius:5px;outline:none}gux-tab .gux-tab gux-tooltip-title{max-width:160px;white-space:nowrap}";

const GuxTab = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.internalactivatetabpanel = createEvent(this, "internalactivatetabpanel", 7);
    this.tabId = undefined;
    this.guxDisabled = false;
    this.active = false;
  }
  onClick() {
    if (!this.active && !this.guxDisabled) {
      this.internalactivatetabpanel.emit(this.tabId);
    }
  }
  onFocusin() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    void this.tooltipTitleElement.setShowTooltip();
  }
  onFocusout() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    void this.tooltipTitleElement.setHideTooltip();
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxSetActive(active) {
    this.active = active;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxFocus() {
    this.buttonElement.focus();
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxGetActive() {
    return this.active;
  }
  render() {
    return (h("button", { class: {
        'gux-disabled': this.guxDisabled,
        'gux-tab': true,
        'gux-active': this.active
      }, type: "button", "aria-disabled": this.guxDisabled.toString(), id: `gux-${this.tabId}-tab`, role: "tab", "aria-controls": `gux-${this.tabId}-panel`, "aria-selected": this.active.toString(), tabIndex: this.active ? 0 : -1, ref: el => (this.buttonElement = el) }, h("gux-tooltip-title", { ref: el => (this.tooltipTitleElement = el) }, h("span", null, h("slot", null)))));
  }
};
GuxTab.style = guxTabCss;

export { GuxTab as gux_tab };
