class ClickEmitter extends HTMLElement {
  connectedCallback() {
    this.addEventListener("click", this.emitEvent.bind(this));
  }

  emitEvent() {
    let eventName = this.getAttribute("event-name") || "defaultEvent";
    let event = new CustomEvent(eventName, {
      bubbles: true,
      detail: { message: "Event triggered from ClickEmitter" },
    });
    console.log("Dispatching Event.");
    this.dispatchEvent(event);
  }
}

customElements.define("click-emitter", ClickEmitter);
