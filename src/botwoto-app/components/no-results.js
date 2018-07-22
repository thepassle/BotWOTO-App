import { LitElement, html } from '@polymer/lit-element/';

class NoResults extends LitElement {
	_render() {
		return html`
			<style>
				.no-results {
					display: flex;
					justify-content: center;
					height: 88px;
					line-height: 44px;
					color: #484b52;
				}
			</style>
			<div class="no-results">
				<h4>No results! :(</h4>
			</div>
		`;
	}
}

customElements.define('no-results', NoResults);
