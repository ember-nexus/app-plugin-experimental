import { css } from 'lit';

const thumbnailComponentStyle = css`
  * {
    box-sizing: border-box;
  }

  :host {
    aspect-ratio: 1;
    width: min(100%, 8em);
    min-width: 4em;
    container-type: size;
    display: inline-block;
  }

  .thumbnail-component {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1;
    gap: 0.5em;

    font-weight: 400;
    font-size: 1em;

    color: #fff;

    border-radius: 0.5em;
    position: relative;
  }

  @container (width < 6em) {
    .thumbnail-component {
      gap: 0;
    }
    .thumbnail-component .name {
      font-size: 1.25em;
      max-width: calc(100% - 0.5em);
    }
    .thumbnail-component .type {
      font-size: 0.85em;
      max-width: calc(100% - 0.5em);
    }
  }

  .name {
    font-size: 1.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: calc(100% - 1em);
  }

  .type {
    font-size: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: calc(100% - 1em);
  }
`;

export { thumbnailComponentStyle };
