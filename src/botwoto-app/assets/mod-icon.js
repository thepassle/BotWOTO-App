import { LitElement, html } from '@polymer/lit-element/';

import '@polymer/paper-tooltip/paper-tooltip.js';
import { GREEN } from '../styles/Colors';

class ModIcon extends LitElement {
	static get properties() {
		return {
			width: Number,
			height: Number
		};
	}

	_render({width, height}) {
		return html`<div>
				<svg style="fill:${GREEN}; width:${width}px;height:${height}px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.22 16.42L4.98 13.45L3.08 12.45L4.26 11.13L5.87 12.45L16.14 1L20 0L19.5 3.61L8.34 14.38L9.66 15.49L8.48 16.78L7.23 15.38L4.37 18.09L5.4 19.03L4.26 20L3.26 19.25L2.61 19.68L0.75 18.09L1.11 17.39L0.11 16.64L0.9 15.38L2.22 16.42Z"/></svg>
				<paper-tooltip animation-delay="0" offset="0">mod</paper-tooltip>
			</div>
			`;
	}
}

customElements.define('mod-icon', ModIcon);