import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("listen-event")
export class DisplayComponent extends LitElement {
  @property({ type: Boolean }) userLoggedIn = false;

  static styles = css`
    /* Styles go here */
  `;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("login-success", this.handleLoginSuccess);
  }

  disconnectedCallback() {
    document.removeEventListener("login-success", this.handleLoginSuccess);
    super.disconnectedCallback();
  }

  handleLoginSuccess = () => {
    this.userLoggedIn = true;
    this.requestUpdate(); // Request a re-render of the component
  };

  render() {
    return html`
      ${this.userLoggedIn
        ? html`<p>User is logged in!</p>`
        : html`<p>Please log in.</p>`}
    `;
  }
}
