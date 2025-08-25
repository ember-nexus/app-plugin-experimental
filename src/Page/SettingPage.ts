import { i18n } from 'i18next';
import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ActorRefFrom, SnapshotFrom } from 'xstate';

import { withStateMachine } from '../Decorator/index.js';
import { withTranslation } from '../Decorator/index.js';
import { settingPageMachine, settingPageMachineTags } from '../Machine/Page/index.js';
import { indexStyles } from '../Style/index.js';

@customElement('ember-nexus-page-setting')
@withTranslation()
@withStateMachine(settingPageMachine)
class SettingPage extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  i18n: i18n;

  state: SnapshotFrom<typeof settingPageMachine>;
  send: ActorRefFrom<typeof settingPageMachine>['send'];

  get stateTag(): settingPageMachineTags {
    return [...this.state.tags][0] as settingPageMachineTags;
  }

  private onSaveSettings(event: Event): void {
    event.preventDefault();
    this.send({
      type: 'saveSettings',
    });
  }

  render(): TemplateResult {
    let loadingBar: string | TemplateResult = '';
    if (this.stateTag === settingPageMachineTags.SavingSettings) {
      loadingBar = html`
        <progress class="progress w-full"></progress>
        <p>Updating settings...</p>
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
          <h2 class="card-title">${t?.('page.setting.title') ?? 'Logout'}</h2>
          <p>${this.stateTag}</p>
          <div class="flex gap-2">
            <p>Language</p>
            <details class="dropdown">
              <summary class="btn m-1">select language</summary>
              <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-full p-2 shadow-sm">
                <li>
                  <a class="flex content-center">
                    <div class="basis-0 grow">
                      <p class="text">English</p>
                      <p class="text-sm">English</p>
                    </div>
                    <span class="text font-mono flex-grow-0">EN</span>
                  </a>
                </li>
                <li>
                  <a class="flex content-center">
                    <div class="basis-0 grow">
                      <p class="text">German</p>
                      <p class="text-sm">Deutsch</p>
                    </div>
                    <span class="text font-mono flex-grow-0">DE</span>
                  </a>
                </li>
                <li>
                  <a class="flex content-center">
                    <div class="basis-0 grow">
                      <p class="text">Norwegian</p>
                      <p class="text-sm">Norsk</p>
                    </div>
                    <span class="text font-mono flex-grow-0">NO</span>
                  </a>
                </li>
              </ul>
            </details>
          </div>
          <div class="flex gap-2">
            <button
              class="btn btn-success basis-0 grow ${this.stateTag === settingPageMachineTags.WaitingForSaveSettings
                ? ''
                : 'btn-disabled'}"
              @click=${this.onSaveSettings}
            >
              ${t?.('page.setting.actionSaveSettings') ?? 'Logout'}
            </button>
          </div>
          ${errorBlock} ${loadingBar}
        </div>
      </div>
    `;
  }
}

export { SettingPage };
