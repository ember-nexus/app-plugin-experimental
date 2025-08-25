import { i18n } from 'i18next';
import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ActorRefFrom, SnapshotFrom } from 'xstate';

import { withStateMachine } from '../Decorator/index.js';
import { withTranslation } from '../Decorator/index.js';
import { logoutPageMachine, logoutPageMachineTags } from '../Machine/Page/index.js';
import { indexStyles } from '../Style/index.js';

@customElement('ember-nexus-page-logout')
@withTranslation()
@withStateMachine(logoutPageMachine)
class LogoutPage extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  i18n: i18n;

  state: SnapshotFrom<typeof logoutPageMachine>;
  send: ActorRefFrom<typeof logoutPageMachine>['send'];

  get stateTag(): logoutPageMachineTags {
    return [...this.state.tags][0] as logoutPageMachineTags;
  }

  private onConfirmLogout(event: Event): void {
    event.preventDefault();
    this.send({
      type: 'confirmLogout',
    });
  }

  render(): TemplateResult {
    let loadingBar: string | TemplateResult = '';
    if (this.stateTag === logoutPageMachineTags.LoggingOut) {
      loadingBar = html`
        <progress class="progress w-full"></progress>
        <p>Logging out...</p>
      `;
    }
    let errorBlock: undefined | TemplateResult;
    if (this.state.context.error) {
      let errorMessage = this.state.context.error;
      if (errorMessage instanceof Error) {
        errorMessage = errorMessage.message;
      }
      errorBlock = html` <p class="text-error">${errorMessage}</p> `;
    }
    const t = this.i18n?.t;
    return html`
      <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body p-3">
          <h2 class="card-title">${t?.('page.logout.title') ?? 'Logout'}</h2>
          <p>${this.stateTag}</p>
          <div class="flex gap-2">
            <button
              class="btn btn-success basis-0 grow ${this.stateTag === logoutPageMachineTags.WaitingForLogoutConfirmation
                ? ''
                : 'btn-disabled'}"
              @click=${this.onConfirmLogout}
            >
              ${t?.('page.logout.actionConfirmLogout') ?? 'Logout'}
            </button>
          </div>
          ${errorBlock} ${loadingBar}
        </div>
      </div>
    `;
  }
}

export { LogoutPage };
