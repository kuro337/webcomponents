class EventListener extends HTMLElement {
  connectedCallback() {
    let eventName = this.getAttribute("listen-event") || "defaultEvent";
    window.addEventListener(eventName, this.handleEvent.bind(this));
  }

  handleEvent(event) {
    console.log("Received event: ", event.detail.message);
  }
}

customElements.define("event-listener", EventListener);
