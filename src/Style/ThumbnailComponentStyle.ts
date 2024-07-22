import { css } from 'lit';

const thumbnailComponentStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400:500:600:700&display=swap');

  * {
    box-sizing: border-box;
  }

  :host {
    aspect-ratio: 1;
    width: min(100%, 8rem);
    min-width: 4rem;
  }

  .thumbnail-component {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1;
    gap: 0.5rem;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;

    color: #fff;

    border-radius: 0.5rem;
    position: relative;
  }

  .name {
    font-size: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: calc(100% - 1rem);
  }

  .type {
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: calc(100% - 1rem);
  }
`;

export { thumbnailComponentStyle };
