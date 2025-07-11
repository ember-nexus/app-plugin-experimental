import {html, LitElement, TemplateResult, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
import {ActorRefFrom, SnapshotFrom} from 'xstate';

import {loginPageMachine, loginPageMachineTags} from '../Machine/Page/index.js';
import {indexStyles} from '../Style/index.js';
import {withStateMachine} from "../Decorator";

@customElement('ember-nexus-page-login')
@withStateMachine(loginPageMachine)
class LoginPage extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  state: SnapshotFrom<typeof loginPageMachine>;
  send: ActorRefFrom<typeof loginPageMachine>['send'];

  get stateTag(): loginPageMachineTags {
    return [...this.state.tags][0] as loginPageMachineTags;
  }

  private onUniqueUserIdentifierChange(event: InputEvent): void {
    const target = event.target as EventTarget;
    if (!('value' in target)) {
      return;
    }
    this.send({
      type: 'formUpdate',
      uniqueUserIdentifier: target.value as string,
      password: this.state.context.password,
    });
  }

  private onPasswordChange(event: InputEvent): void {
    const target = event.target as EventTarget;
    if (!('value' in target)) {
      return;
    }
    this.send({
      type: 'formUpdate',
      uniqueUserIdentifier: this.state.context.uniqueUserIdentifier,
      password: target.value as string,
    });
  }

  private onClear(event: Event): void {
    console.log('on clear');
    event.preventDefault();
    this.send({
      type: 'formClear'
    });
  }

  private onSubmit(event: Event): void {
    console.log('on submit');
    event.preventDefault();
    this.send({
      type: 'formSubmit'
    });
  }

  render(): TemplateResult {
    let loadingBar: string | TemplateResult = '';
    if (this.stateTag === loginPageMachineTags.SubmittingForm) {
      loadingBar = html`
        <progress class="progress w-full"></progress>
        <p>Logging in...</p>
      `;
    }
    return html`
      <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body p-3">
          <h2 class="card-title">
            Login
          </h2>
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Email or username:</legend>
            <input
              type="text"
              class="input"
              placeholder="Type here"
              .value="${this.state.context.uniqueUserIdentifier}"
              @input=${this.onUniqueUserIdentifierChange}
              ?disabled=${this.stateTag !== loginPageMachineTags.WaitingForFormEdit}
            />
          </fieldset>
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Password:</legend>
            <input
              type="password"
              class="input"
              placeholder="Type here"
              .value="${this.state.context.password}"
              @input=${this.onPasswordChange}
              ?disabled=${this.stateTag !== loginPageMachineTags.WaitingForFormEdit}
            />
          </fieldset>
          <div class="flex gap-2">
            <button
              class="btn btn-soft btn-neutral basis-0 grow ${this.stateTag === loginPageMachineTags.WaitingForFormEdit ? '' : 'btn-disabled'}"
              @click=${this.onClear}
            >
              Clear
            </button>
            <button
              class="btn btn-soft btn-success basis-0 grow ${this.stateTag === loginPageMachineTags.WaitingForFormEdit ? '' : 'btn-disabled'}"
              @click=${this.onSubmit}
            >
              Login
            </button>
          </div>
          ${loadingBar}
        </div>
      </div>
    `;
  }
}

export {LoginPage};
