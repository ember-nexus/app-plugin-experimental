import { css } from 'lit';

const iconComponentStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400:500:600:700&display=swap');

  * {
    box-sizing: border-box;
  }

  :host {
    aspect-ratio: 1;
    min-height: 1.5rem;
    height: 2rem;
  }

  .icon-component {
    height: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;

    color: #fff;

    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .icon {
    width: 75%;
    height: 75%;
  }
`;

export { iconComponentStyle };
