import { LitElement, html } from '@polymer/lit-element/';

import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-text-field/vaadin-text-area.js';
import '@vaadin/vaadin-dropdown-menu/vaadin-dropdown-menu.js';

import { SharedStyles } from './../styles/SharedStyles';
import { ModalStyles } from './../styles/ModalStyles';

import { closeModal } from '../../actions/modal';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import { editCommand } from '../../actions/commands.js';

import './../assets/delete-icon';
import './../assets/edit-icon';

class EditModal extends connect(store)(LitElement) {

	static get properties() {
		return {
			command: Object,
			inputIsValid: Boolean
		};
	}

	constructor() {
		super();
		this.command = { command: '', reply: '', clearance:''};
		this.inputIsValid = false;
	}

	_validate() {
		const clearance = this.shadowRoot.getElementById('clearance').value;
		const reply = this.shadowRoot.getElementById('reply').value;

		const clearanceRegex = new RegExp('(^sub$|^mod$|^all$)');
		const replyCheck = reply.length > 0;

		this.inputIsValid = clearanceRegex.test(clearance) && replyCheck;
	}

	_handleSubmit(){
		const command = this.command.command;
		const clearance = this.shadowRoot.getElementById('clearance').value;
		const reply = this.shadowRoot.getElementById('reply').value;
		
		store.dispatch(editCommand({command,clearance,reply}));
	}

	_firstRendered() {
		const textArea = this.shadowRoot.getElementById('reply');
		setTimeout(() => {
			textArea._textAreaValueChanged();
		});
	}

	_render({command, inputIsValid}) {
		return html`
			${SharedStyles}
			${ModalStyles}

			<div class="modal">
				<h1>${command.command}</h1>

				<vaadin-dropdown-menu on-value-changed="${() => this._validate()}" id="clearance" value="${command.clearance}" label="clearance" required>
				  <template>
				    <vaadin-list-box>
				      <vaadin-item value="all">all</vaadin-item>
				      <vaadin-item value="sub">sub</vaadin-item>
				      <vaadin-item value="mod">mod</vaadin-item>
				    </vaadin-list-box>
				  </template>
				</vaadin-dropdown-menu>

				<vaadin-text-area required on-input="${() => this._validate()}" id="reply" label="reply" value="${command.reply}"></vaadin-text-area>
			    
			    <div class="buttons">
				    <vaadin-button disabled="${!inputIsValid}" on-tap="${() => this._handleSubmit()}" class="edit" autofocus>
					    <edit-icon slot="prefix" width="20" height="20" fill="white"></edit-icon>
					    Save
					</vaadin-button>
					<vaadin-button on-tap="${() => store.dispatch(closeModal())}" class="delete" dialog-dismiss autofocus>
					    <delete-icon slot="prefix" width="20" height="20" fill="white"></delete-icon>
					    Discard
					</vaadin-button>
				</div>
			</div>
			`;
	}

	_stateChanged(){}
}

customElements.define('edit-modal', EditModal);
