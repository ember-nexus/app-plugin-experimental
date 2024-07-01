import { css } from 'lit';

const pillComponentStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400:500:600:700&display=swap');

  .pill-component {
    height: 2rem;
    border-radius: 1rem;
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    padding-right: 0.5rem;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;

    //border: 1px solid gray;

    background-color: #e9e9ed;

    color: #000;

    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export { pillComponentStyle };
