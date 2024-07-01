import { css } from 'lit';

const thumbnailComponentStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400:500:600:700&display=swap');

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
    font-size: 2rem;
    overflow: hidden;
    white-space: nowrap;
  }

  .type {
    font-size: 1rem;
    overflow: hidden;
    white-space: nowrap;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export { thumbnailComponentStyle };
