import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("login-component")
export class LoginComponent extends LitElement {
  @property({ type: Boolean })
  loggedIn = false;

  private apiUrl: string =
    "https://api.sampleapis.com/codingresources/codingResources"; // This is now a private field, not a property.

  static styles = css`
    /* Styles go here */
  `;

  private async handleLogin() {
    // A dummy login function that fetches from an API
    try {
      const response = await fetch(this.apiUrl);

      if (response.ok) {
        this.loggedIn = true;
        this.dispatchEvent(new CustomEvent("login-success", { bubbles: true }));
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("There was an error logging in:", error);
    }
  }

  render() {
    if (this.loggedIn) {
      return html`<p>Welcome back!</p>`;
    } else {
      return html`
        <!-- Render your login form -->
        <button @click=${this.handleLogin}>Login</button>
      `;
    }
  }
}
