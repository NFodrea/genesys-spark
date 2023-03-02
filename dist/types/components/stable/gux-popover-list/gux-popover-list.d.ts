import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { PopperPosition } from './gux-popover-list.types';
/**
 * @slot - popover content
 */
export declare class GuxPopoverList {
  private popperInstance;
  private hiddenObserver;
  private popupElement;
  private root;
  /**
   * Indicates the id of the element the popover should anchor to
   */
  for: string;
  /**
   * Indicate position of popover element arrow (follow popper js position attribute api)
   */
  position: PopperPosition;
  /**
   * Indicate if the dismiss button is displayed
   */
  displayDismissButton: boolean;
  /**
   * Close popover when the user clicks outside of its bounds
   */
  closeOnClickOutside: boolean;
  /**
   * Fired when a user dismisses the popover
   */
  guxdismiss: EventEmitter<void>;
  hidden: boolean;
  hiddenHandler(hidden: boolean): void;
  checkForClickOutside(event: MouseEvent): void;
  private runPopper;
  private destroyPopper;
  private dismiss;
  connectedCallback(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  render(): JSX.Element;
}
