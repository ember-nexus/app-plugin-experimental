import { css } from 'lit';

const pillComponentStyle = css`
  * {
    box-sizing: border-box;
  }

  :host {
    min-height: 1em;
    height: 2em;
  }

  .pill-component {
    height: 100%;
    border-radius: 10000px;
    display: inline-flex;
    gap: 0.5em;
    align-items: center;
    padding-right: 0.5em;
    padding-left: 0.5em;

    font-weight: 400;

    //border: 1px solid gray;
    border: 2px solid #e9e9ed;

    background-color: #fff;

    color: #000;

    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .pill-component.has-icon {
    padding-left: 0;
  }

  .content {
    font-size: 1em;
    text-wrap: nowrap;
  }

  .svg-icon {
    width: 1.5em;
    height: 1.5em;
    margin-left: 0.25em;
  }

  .svg-icon > svg {
    display: block;
  }
`;

export { pillComponentStyle };
