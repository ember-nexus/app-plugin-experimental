import { css } from 'lit';

const thumbnailComponentStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400:500:600:700&display=swap');

  * {
    box-sizing: border-box;
  }

  .thumbnail-component {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 8rem;
    height: 8rem;
    gap: 0.5rem;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;

    color: #fff;

    border-radius: 0.5rem;
  }

  .name {
    font-size: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 7rem;
  }

  .info {
    display: flex;
    gap: 0.5rem;
    max-width: 7rem;
  }

  .type {
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 7rem;
  }

  .icon {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
  }
`;

export { thumbnailComponentStyle };
