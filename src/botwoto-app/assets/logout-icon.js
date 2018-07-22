import { LitElement, html } from '@polymer/lit-element/';

class LogoutIcon extends LitElement {
	static get properties() {
		return {
			width: Number,
			height: Number
		};
	}

	_render({width, height}) {
		return html`
			<style>
				#logout {
					margin-right: 5px;
				}

				@media only screen and (max-width: 600px) {
					#logout {
						margin-left: 3px;
						margin-right: 0px;
					}
				}
			</style>
			<svg id="logout" style="width:${width}px; height:${height}px;"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16">
			<path fill="white" d="M9 4v-3h-9v14h9v-3h-1v2h-7v-12h7v2z"></path>
			<path fill="white" d="M16 8l-5-4v2h-5v4h5v2z"></path>
			</svg>`;
	}
}

customElements.define('logout-icon', LogoutIcon);


