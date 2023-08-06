import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("header-component")
export class HeaderComponent extends LitElement {
  @property()
  someProp = "Random Value";

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      text-align: center;
    }
  `;

  render() {
    return html`
      <p>Welcome to the Lit tutorial!</p>
      <p>This is from the ${this.someProp} prop.</p>
    `;
  }
}
