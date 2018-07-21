import { LitElement, html } from '@polymer/lit-element/';

import '@polymer/paper-tooltip/paper-tooltip.js';

class SearchIcon extends LitElement {
	
	static get properties() {
		return {
			width: Number,
			height: Number
		};
	}

	_render({width, height}) {
		return html`
			<style>
				.search:hover {
					cursor: pointer;
				}
			</style>
			<div class="search">
				<svg style="fill: #36393e; cursor: default; width:${width}px;height:${height}px;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.890748 14.476534l3.151307 3.151307c.381698.381698.384003 1.017169-.006521 1.407693-.393247.393247-1.02077.393444-1.407693.00652l-3.151307-3.151306C13.495716 16.589209 12.29583 17 11 17c-3.313708 0-6-2.686291-6-6 0-3.313708 2.686292-6 6-6 3.313709 0 6 2.686292 6 6 0 1.29583-.410791 2.495715-1.109252 3.476534zM11 15.5c2.485281 0 4.5-2.014719 4.5-4.5S13.485281 6.5 11 6.5 6.5 8.514719 6.5 11s2.014719 4.5 4.5 4.5z"/></svg>
				<paper-tooltip animation-delay="0" offset="0">search</paper-tooltip>
			</div>
				`;
	}
}

customElements.define('search-icon', SearchIcon);


