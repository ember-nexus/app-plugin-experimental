/* eslint @typescript-eslint/no-explicit-any: "off" */
interface LifecycleCapableWebComponent extends HTMLElement {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  requestUpdate?(...args: any[]): void;
}

export { LifecycleCapableWebComponent };
