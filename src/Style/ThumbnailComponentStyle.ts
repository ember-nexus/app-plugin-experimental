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
    container-type: size;
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

  @container (width < 6rem) {
    .thumbnail-component {
      gap: 0;
    }
    .thumbnail-component .name {
      font-size: 1.25rem;
      max-width: calc(100% - 0.5rem);
    }
    .thumbnail-component .type {
      font-size: 0.85rem;
      max-width: calc(100% - 0.5rem);
    }
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
