import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@material/mwc-top-app-bar";
import "@material/mwc-icon-button";

@customElement("sticky-header")
export class StickyHeaderComponent extends LitElement {
  @property({ type: String })
  headerText = "Sticky Header";

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
    }

    mwc-top-app-bar {
      position: sticky;
      top: 0;
      transition: all 0.3s ease-in-out;
      --mdc-theme-primary: #862e9c; /* Adjust primary color if needed */
      --mdc-theme-on-primary: #f8f9fa; /* Adjust text/icon color if needed */
    }

    :host(.scrolled) mwc-top-app-bar {
      --mdc-theme-primary: rgba(134, 46, 156, 0.6);
      height: 50px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("scroll", this.onScroll);
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this.onScroll);
    super.disconnectedCallback();
  }

  onScroll = () => {
    if (window.scrollY > window.innerHeight) {
      this.classList.add("scrolled");
    } else {
      this.classList.remove("scrolled");
    }
  };

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
