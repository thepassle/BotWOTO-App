import { LitElement, html } from '@polymer/lit-element/';

import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-text-field/vaadin-text-area.js';

import { SharedStyles } from './../styles/SharedStyles';
import { ModalStyles } from './../styles/ModalStyles';

import { closeModal } from '../../actions/modal';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import { deleteCommand } from '../../actions/commands.js';

import './../assets/delete-icon';
import './../assets/edit-icon';

class DeleteModal extends connect(store)(LitElement) {

	static get properties() {
		return {
			command: Object
		};
	}

	constructor() {
		super();
		this.command = { command: '', reply: '', clearance: ''};
	}

	_render({command}) {
		return html`
			${SharedStyles}
			${ModalStyles}
			<div class="modal">
				<h1>Hey!</h1>
				<p>Are you sure you want to delete: <strong>${command.command}</strong>?</p>
			    <div class="buttons">
				    <vaadin-button on-tap="${() => store.dispatch(deleteCommand(command))}" class="edit" autofocus>
					    Yes
					</vaadin-button>
					<vaadin-button on-tap="${() => store.dispatch(closeModal())}" class="delete" dialog-dismiss autofocus>
					    No
					</vaadin-button>
				</div>
			</div>
		`;
	}

	_stateChanged() {}
}

customElements.define('delete-modal', DeleteModal);
