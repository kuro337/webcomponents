import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@material/mwc-top-app-bar";
import "@material/mwc-icon-button";

@customElement("header-component")
export class HeaderComponent extends LitElement {
  @property({ type: String })
  headerText = "Header";

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
    }

    mwc-top-app-bar {
      --mdc-theme-primary: #862e9c; /* Adjust primary color if needed */
      --mdc-theme-on-primary: #f8f9fa; /* Adjust text/icon color if needed */
    }
  `;

  render() {
    return html`
      <mwc-top-app-bar>
        <mwc-icon-button slot="navigationIcon" icon="menu"></mwc-icon-button>
        <div slot="title">${this.headerText}</div>
        <mwc-icon-button slot="actionItems" icon="bookmark"></mwc-icon-button>
      </mwc-top-app-bar>
    `;
  }
}

/*

pnpm install @material/mwc-top-app-bar @material/mwc-icon-button

Include this for icons to show up 

<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

*/
