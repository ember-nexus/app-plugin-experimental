interface LifecycleCapableWebComponent {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  requestUpdate?(...args: any[]): void;
}

export {LifecycleCapableWebComponent};
