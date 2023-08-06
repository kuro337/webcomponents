import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-element")
export class MyElement extends LitElement {
  @property()
  version = "STARTING";

  @property({ type: String })
  message = "Initial Message";

  @property({ type: String })
  color = "black"; // default color

  static styles = css`
    #message-text {
      color: var(--text-color);
    }

    button {
      background-color: lightgray;
      border: 1px solid black;
      padding: 5px;
    }

    button:hover {
      background-color: gray;
    }
  `;

  changeMessage = (): void => {
    this.message = "Updated Message!";
  };

  render() {
    return html`
      <style>
        :host {
          --text-color: ${this.color};
        }
      </style>
      <p>Welcome to the Lit tutorial!</p>
      <p>This is the ${this.version} code.</p>
      <p>Message: <span id="message-text">${this.message}</span></p>
      <button @click=${this.changeMessage}>Change Message</button>
    `;
  }
}
