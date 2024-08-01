import { css } from 'lit';

const cardComponentStyle = css`
  * {
    box-sizing: border-box;
  }

  :host {
    width: 100%;
  }

  .card-component {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;

    font-weight: 400;
    font-size: 1rem;

    color: #fff;

    border-radius: 0.5rem;
    padding: 1rem;
  }

  span.icon {
    display: inline-block;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .name {
    margin: 0;
  }

  .info {
    display: flex;
    gap: 0.5rem;
  }
`;

export { cardComponentStyle };
