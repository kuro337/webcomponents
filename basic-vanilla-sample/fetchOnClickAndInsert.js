class FetchButtonComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.fetchURL = this.getAttribute("fetch-url");
    this.targetID = this.getAttribute("target-id");
    this.columnOrder = (this.getAttribute("column-order") || "").split(",");
    this.debug = this.hasAttribute("debug") || false;

    this.shadowRoot.innerHTML = `
      <style>
        td {
          max-width: 200px;
          max-height: 100px;
          overflow: auto;
        }
        img {
          max-width: 100%;
          max-height: 100%;
        }
      </style>
      
      <button>Fetch Data</button>
    `;
    this.shadowRoot.querySelector("button").addEventListener("click", () => {
      this.fetchData();
    });
  }

  logData(data) {
    try {
      // Try to parse the data string into an object
      console.log("Parsed Raw Response:");
      //const parsedData = JSON.parse(data);

      console.log("Data: ", data);
      console.log("Type: ", typeof data);
      console.log("Properties: ", Object.keys(data[0]));
    } catch (error) {
      console.log("Could not parse data string into JSON. Raw data:", data);
    }
  }

  insertTable(data) {
    // create a table of the data
    let table = document.createElement("table");
    let tableHead = document.createElement("thead");
    let tableBody = document.createElement("tbody");

    // create the table head
    let trHead = document.createElement("tr");

    let headers = this.columnOrder[0] ? this.columnOrder : Object.keys(data[0]);

    headers.forEach((header) => {
      let th = document.createElement("th");
      th.textContent = header.charAt(0).toUpperCase() + header.slice(1); // capitalize first letter
      trHead.appendChild(th);
    });
    tableHead.appendChild(trHead);

    // create the table body
    data.forEach((item) => {
      let trBody = document.createElement("tr");
      headers.forEach((header) => {
        let td = document.createElement("td");
        if (header === "image") {
          let img = document.createElement("img");
          img.src = item[header];
          img.alt = item["title"] || "Image";
          td.appendChild(img);
        } else {
          td.textContent = Array.isArray(item[header])
            ? item[header].join(", ")
            : item[header];
        }
        trBody.appendChild(td);
      });
      tableBody.appendChild(trBody);
    });

    // append thead and tbody to the table
    table.appendChild(tableHead);
    table.appendChild(tableBody);

    const styleElem = document.createElement("style");
    styleElem.textContent = `
        td {
            max-width: 200px;
            max-height: 100px;
            overflow: auto;
        }
        img {
            max-width: 100%;
            max-height: 100%;
        }
    `;
    let target = document.getElementById(this.targetID);

    target.appendChild(styleElem);
    target.appendChild(table);
    // append the table to the shadow root
    // this.shadowRoot.appendChild(table);
  }

  fetchData() {
    fetch(this.fetchURL)
      .then((response) => response.json())
      .then((data) => {
        let target = document.getElementById(this.targetID);
        if (this.debug) this.logData(data);
        if (target) {
          target.innerHTML = "";
          try {
            // Try to parse the data string into an object
            // const parsedData = JSON.parse(data);

            // Create a table with the parsed data and append it to the target element
            this.insertTable(data);
          } catch (error) {
            console.error(
              "Could not parse data string into JSON. Raw data:",
              data
            );
          }
        } else {
          console.error(
            `No element with ID "${this.targetID}" found in the DOM`
          );
        }
      })
      .catch((error) => console.error("Fetch error: ", error));
  }
}

customElements.define("fetch-button-component", FetchButtonComponent);
