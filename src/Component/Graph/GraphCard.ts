import { ExtensionCategory, Graph, register } from '@antv/g6';
import { light } from '@antv/g6/esm/themes';
import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { query } from 'lit/decorators/query.js';
import { customElement } from 'lit/decorators.js';

import { indexStyles } from '../../Style/index.js';

@customElement('ember-nexus-graph-card')
class GraphCard extends LitElement {
  static styles = [unsafeCSS(indexStyles)];

  @query('#g6Root')
  g6Root;

  async delay(ms: number): Promise<void> {
    return new Promise((res) => setTimeout(res, ms));
  }

  firstUpdated(): void {
    const { width, height } = this.g6Root.getBoundingClientRect();
    this.delay(500).then(() => {
      const theme = {
        ...light,
        node: {
          ...light.node,
          style: {
            ...light.node?.style,
            fill: '#f00',
          },
        },
        background: '#ff0', // '#eff1f5'
      };
      console.log(theme);
      register(ExtensionCategory.THEME, 'test', theme);

      const graph = new Graph({
        theme: 'dark',
        container: this.g6Root,
        width: width,
        height: height,
        data: {
          nodes: new Array(10).fill(0).map((_, i) => ({ id: `${i}`, label: `${i}` })),
          edges: [
            { source: '0', target: '1' },
            { source: '0', target: '2' },
            { source: '0', target: '3' },
            { source: '0', target: '4' },
            { source: '0', target: '5' },
            { source: '0', target: '7' },
            { source: '0', target: '8' },
            { source: '0', target: '9' },
            { source: '2', target: '3' },
            { source: '4', target: '5' },
            { source: '4', target: '6' },
            { source: '5', target: '6' },
          ],
        },
        node: {
          style: {
            labelText: (d) => String(d.label ?? '-'),
            labelPlacement: 'center',
            labelFill: '#fff',
          },
        },
        layout: {
          type: 'd3-force',
          link: {
            distance: 100,
            strength: 2,
          },
          collide: {
            radius: 40,
          },
        },
        behaviors: [
          'drag-canvas',
          'zoom-canvas',
          {
            type: 'drag-element-force',
            fixed: true,
          },
        ],
        plugins: [
          {
            type: 'background',
            backgroundColor: '#eff1f5',
          },
        ],
      });

      graph.render();
    });
  }

  render(): TemplateResult {
    return html`
      <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body p-3">
          <h2 class="card-title">G6.js</h2>
        </div>
        <div id="g6Root" class="w-full min-h-60"></div>
      </div>
    `;
  }
}

export { GraphCard };
