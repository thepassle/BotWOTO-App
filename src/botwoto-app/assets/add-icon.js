import { LitElement, html } from '@polymer/lit-element/';

import '@polymer/paper-tooltip/paper-tooltip.js';

class AddIcon extends LitElement {
	
	static get properties() {
		return {
			width: Number,
			height: Number,
			fill: String
		};
	}

	_render({width, height, fill}) {
		return html`<div>
				<svg style="fill:${fill}; width:${width}px;height:${height}px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.060364 11.060364H6.257779c-.518947 0-.939637.42069-.939637.939636 0 .518947.42069.939636.939637.939636h4.802585v4.802585c0 .518947.42069.939637.939636.939637.518947 0 .939636-.42069.939636-.939636v-4.802586h4.802585c.518947 0 .939637-.42069.939637-.939636 0-.518947-.42069-.939636-.939636-.939636h-4.802586V6.257779c0-.518947-.42069-.939637-.939636-.939637-.518947 0-.939636.42069-.939636.939637v4.802585z"/></svg>
			</div>
			`;
	}
}

customElements.define('add-icon', AddIcon);


