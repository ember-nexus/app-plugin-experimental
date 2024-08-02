import { css } from 'lit';

const fontStyle = css`
  .font-sans {
    font-family: var(--font-sans, 'Roboto'), sans-serif;
  }
  .font-serif {
    font-family: var(--font-serif, 'Noto Serif'), serif;
  }
  .font-mono {
    font-family: var(--font-mono, 'Roboto Mono'), monospace;
  }
`;

export { fontStyle };
