/* eslint @typescript-eslint/no-explicit-any: "off" */
import { LifecycleCapableWebComponent } from './LifecycleCapableWebComponent.js';

interface ElementCapableWebComponent extends LifecycleCapableWebComponent {
  elementId: string;
}

export { ElementCapableWebComponent };
