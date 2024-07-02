import { css } from 'lit';

const framelessComponentStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400:500:600:700&display=swap');

  * {
    box-sizing: border-box;
  }

  :host {
    width: 100%;
    height: 100%;
  }

  .frameless-component {
    display: flex;
    width: 100%;
    height: 100%;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;

    color: #fff;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export { framelessComponentStyle };
