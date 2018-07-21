import { LitElement, html } from '@polymer/lit-element/';

import '@polymer/paper-tooltip/paper-tooltip.js';
import { GREEN } from '../styles/Colors';

class SubIcon extends LitElement {
	
	static get properties() {
		return {
			width: Number,
			height: Number
		};
	}

	_render({width, height}) {
		return html`<div>
					<svg style="fill:${GREEN}; width:${width}px;height:${height}px;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<path d="M12.9 15.4l-4.9-2.6-4.9 2.6 0.9-5.4-4-3.9 5.5-0.8 2.4-5 2.4 5 5.5 0.8-3.8 3.9 0.9 5.4z"></path>
					</svg>
					<paper-tooltip animation-delay="0" offset="0">sub</paper-tooltip>
			</div>
			`;
	}
}

customElements.define('sub-icon', SubIcon);