import {css} from "lit";

const iconComponentStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400:500:600:700&display=swap');

  .icon-component {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 1rem;

    color: #fff;

    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

export {iconComponentStyle};
