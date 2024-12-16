import { css } from 'lit';

const tmpStyle = css`
  :host {
    display: block;
    container-type: normal;
  }

  .card {
    padding: 0.75em;
    border-radius: 0.75em;
  }

  span.icon {
    display: inline-block;
  }

  .icon {
    width: 1.6em;
    height: 1.6em;
    flex-shrink: 0;
  }

  .name {
    margin: 0;
    font-size: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .info {
    display: flex;
    flex-direction: column;
    font-size: 0.8em;
  }

  .info p {
    margin: 0;
  }

  .description {
    display: flex;
    gap: 0.5em;
  }

  .description p {
    margin: 0;
  }

  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.25em;
    margin-bottom: 0.25em;
  }

  .font-mono {
    font-family: 'Roboto Mono', monospace;
  }
`;

export { tmpStyle };
