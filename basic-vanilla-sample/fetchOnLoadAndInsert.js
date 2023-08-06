class FetchComponent extends HTMLElement {
  connectedCallback() {
    this.fetchURL = this.getAttribute("fetch-url");
    this.targetID = this.getAttribute("target-id");

    fetch(this.fetchURL)
      .then((response) => response.text())
      .then((data) => {
        let target = document.getElementById(this.targetID);
        if (target) {
          target.textContent = data;
        } else {
          console.error(
            `No element with ID "${this.targetID}" found in the DOM`
          );
        }
      })
      .catch((error) => console.error("Fetch error: ", error));
  }
}

customElements.define("fetch-component", FetchComponent);
