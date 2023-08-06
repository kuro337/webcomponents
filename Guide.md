# WebComponents

## Bundling Webcomponents

- Create a folder `typed-components`

```bash
pnpm init

pnpm install --save-dev install typescript tslib @webcomponents/webcomponentsjs lit lit-element rollup @web/rollup-plugin-html @web/rollup-plugin-copy @rollup/plugin-node-resolve @rollup/plugin-terser rollup-plugin-minify-html-literals rollup-plugin-summary @rollup/plugin-typescript
```

- Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "lib": ["DOM", "ESNext"],
    "strict": true,
    "esModuleInterop": true,
    "declaration": false,
    "inlineSources": false,
    "outDir": "./build/ts-out",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "rootDir": "src",
    "moduleResolution": "node",
    "types": ["lit-element"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- `package.json`

```json
{
  "name": "ts-s",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "rollup -c",
    "build:esbuild": "tsc && node build.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "devDependencies": {
    "@rollup/plugin-node-resolve": "^15.1.0",
    "@rollup/plugin-terser": "^0.4.3",
    "@rollup/plugin-typescript": "^11.1.2",
    "@swc/cli": "^0.1.62",
    "@swc/core": "^1.3.73",
    "@web/rollup-plugin-copy": "^0.4.0",
    "@web/rollup-plugin-html": "^2.0.0",
    "@webcomponents/webcomponentsjs": "^2.8.0",
    "esbuild": "^0.18.17",
    "lit": "^2.8.0",
    "lit-element": "^3.3.2",
    "rollup": "^3.27.2",
    "rollup-plugin-minify-html-literals": "^1.2.6",
    "rollup-plugin-summary": "^2.0.0",
    "tslib": "^2.6.1",
    "typescript": "^5.1.6"
  }
}

// pnpm build
```

- Create web component in `src/my-web-component.ts`

```ts
// src/my-web-component.ts

import { LitElement, html, css } from "lit";

class MyWebComponent extends LitElement {
  static styles = css`
    /* Add your component's styles here */
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
      <!-- Add your component's HTML template here -->
      <h1>Hello, Web Component!</h1>
      <p>This is a LitElement-based Web Component.</p>
      <button @click=${this.handleClick}>Click Me</button>
    `;
  }

  handleClick() {
    alert("Button clicked!");
  }
}

customElements.define("my-web-component", MyWebComponent);
```

- Build the component and test usage

```bash
pnpm run build
```

- Open HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Web Component Example</title>
    <script type="module" src="./dist/my-web-component.bundle.js"></script>
  </head>
  <body>
    <my-web-component></my-web-component>
  </body>
</html>
```

- Nesting Web Components

```ts
// FirstComponent.ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("first-component")
export class FirstComponent extends LitElement {
  render() {
    return html`<p>I am the first component!</p>`;
  }
}

// SecondComponent.ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("second-component")
export class SecondComponent extends LitElement {
  render() {
    return html`<p>I am the second component!</p>`;
  }
}

// ParentComponent.ts
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

// Make sure to import the child components so they're defined and can be used within the parent.
import "./FirstComponent";
import "./SecondComponent";

@customElement("parent-component")
export class ParentComponent extends LitElement {
  render() {
    return html`
      <p>I am the parent component and here are my children:</p>
      <first-component></first-component>
      <second-component></second-component>
    `;
  }
}
```

- Rollup

```bash




```
