import { LitElement, html } from '@polymer/lit-element/';

class TwitchIcon extends LitElement {
	static get properties() {
		return {
			width: Number,
			height: Number
		};
	}

	_render({width, height}) {
		return html`<svg style="width:${width}px;height:${height}px;" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 134"><defs><style>.cls-1{fill:#fff;fill-rule:evenodd;}</style></defs><title>Glitch_White_RGB</title><path class="cls-1" d="M89,77l-9,23v94h32v17h18l17-17h26l35-35V77H89Zm107,76-20,20H144l-17,17V173H100V89h96v64Zm-20-41v35H164V112h12Zm-32,0v35H132V112h12Z" transform="translate(-80 -77)"/></svg>`;
	}
}

customElements.define('twitch-icon', TwitchIcon);


