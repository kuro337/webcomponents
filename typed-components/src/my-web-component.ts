import { LitElement, html, css } from "lit";

class MyWebComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `;

  render() {
    return html`
      <h1>Hola, Web Component!</h1>
      <p>This is a LitElement-based Web Component.</p>
      <button @click=${this.handleClick}>Click Me</button>
    `;
  }

  handleClick() {
    alert("Button clicked!");
  }
}

customElements.define("my-web-component", MyWebComponent);
