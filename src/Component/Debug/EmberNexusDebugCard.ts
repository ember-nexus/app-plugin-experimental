import { ServiceResolver } from '@ember-nexus/app-core/Service';
import { Color, formatHex8, rgb } from 'culori';
import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DirectiveResult } from 'lit/directive.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { UnsafeHTMLDirective } from 'lit-html/directives/unsafe-html.js';
import { TriangleAlert } from 'lucide-static';
import { HighlighterCore } from 'shiki';
import { SnapshotFrom } from 'xstate';

import { withGetElementMachine } from '../../Decorator/withGetElementMachine.js';
import { getElementMachine, getElementMachineTags } from '../../Machine/index.js';
import { ShikiJsonHighlighterService } from '../../Service/index.js';
import { indexStyles } from '../../Style/index.js';

@customElement('ember-nexus-debug-card')
@withGetElementMachine()
class EmberNexusDebugCard extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  state: SnapshotFrom<typeof getElementMachine>;

  get stateTag(): getElementMachineTags {
    return [...this.state.tags][0] as getElementMachineTags;
  }

  @property({ type: String, attribute: 'element-id' })
  elementId: string;

  highlighter: HighlighterCore | undefined;

  calculateColorStyles(): object {
    const styles = {};
    const color = this.state.context?.element?.data?.color;
    if (color) {
      styles['--color-base-100'] = color;
      styles['--tw-shadow-color'] = formatHex8({ ...rgb(String(color)), alpha: 0.2 } as Color);
    }
    return styles;
  }

  onServiceResolverLoaded(serviceResolver: ServiceResolver): void {
    const highlighterService = serviceResolver.getServiceOrFail<ShikiJsonHighlighterService>(
      ShikiJsonHighlighterService.identifier,
    );
    highlighterService.getShikiHighlighter().then((highlighter: HighlighterCore) => {
      this.highlighter = highlighter;
      this.requestUpdate();
    });
  }

  render(): TemplateResult {
    switch (this.stateTag) {
      case getElementMachineTags.Error:
        const errorName = this.state.context?.error?.constructor?.name ?? 'Error';
        const errorDescription = (this.state.context?.error as Error)?.message ?? String(this.state.context?.error);
        return html`
          <div class="card bg-base-100 w-full border-warning border-2 border-solid shadow-sm">
            <figure class="absolute h-full w-full opacity-25">
              <span class="absolute -bottom-2 -right-4 text-warning text-[96px]">${unsafeHTML(TriangleAlert)}</span>
            </figure>
            <div class="relative card-body p-3">
              <h2 class="card-title">${errorName}</h2>
              <p class="font-mono text-xs">${this.state.context?.element?.id ?? this.elementId}</p>
              <p class="font-mono text-xs">${errorDescription}</p>
            </div>
          </div>
        `;
      case getElementMachineTags.Loading:
        return html`
          <div class="card bg-base-100 w-full shadow-sm">
            <div class="card-body p-3">
              <h2 class="card-title">Loading</h2>
              <p class="font-mono text-xs">${this.state.context?.element?.id ?? this.elementId}</p>
            </div>
          </div>
        `;
      case getElementMachineTags.Loaded:
        let renderedCode: string | TemplateResult | DirectiveResult<typeof UnsafeHTMLDirective> =
          'waiting to be rendered';
        if (this.highlighter) {
          const code = this.highlighter.codeToHtml(JSON.stringify(this.state.context?.element, null, 2), {
            lang: 'json',
            theme: 'catppuccin-latte',
          });
          renderedCode = unsafeHTML(
            `<div class="text-xs overflow-x-auto p-3 rounded-md" style="background-color:#eff1f5;">${code}</div>`,
          );
        }
        return html`
          <div class="card bg-base-100 w-full shadow-sm" style="${styleMap({ ...this.calculateColorStyles() })}">
            <div class="card-body p-3">
              <h2 class="card-title">
                ${this.state.context?.element?.data?.name ?? 'unknown name'}
                <div class="badge badge-sm badge-neutral rounded-full shadow-sm">
                  ${this.state.context?.element?.type ?? 'unknown type'}
                </div>
              </h2>
              <p class="font-mono text-xs">${this.state.context?.element?.id ?? this.elementId}</p>
              ${renderedCode}
            </div>
          </div>
        `;
    }
  }
}

export { EmberNexusDebugCard };
