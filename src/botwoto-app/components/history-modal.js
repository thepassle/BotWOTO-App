import { LitElement, html } from '@polymer/lit-element/';

import '@vaadin/vaadin-button/vaadin-button.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-spinner/paper-spinner.js';
import { BLUE } from '../styles/Colors';
import axios from 'axios';

import { SharedStyles } from './../styles/SharedStyles';
import { ModalStyles } from './../styles/ModalStyles';

import { closeModal } from '../../actions/modal';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import './../assets/delete-icon';
import './../assets/edit-icon';

class HistoryModal extends connect(store)(LitElement) {

	static get properties() {
		return {
			command: Object,
			history: Array
		};
	}

	constructor() {
		super();
		this.history = [];
	}

	_firstRendered() {
		axios.get(`/api/history/${this.command.command}`)
			.then(json => {
				this.history = json.data.data;
			});
	}

	_render({command, inputIsValid, history}) {
		return html`
			${SharedStyles}
			${ModalStyles}
			<style>
				  paper-spinner.spinner-color {
				    --paper-spinner-layer-1-color: ${BLUE};
				    --paper-spinner-layer-2-color: ${BLUE};
				    --paper-spinner-layer-3-color: ${BLUE};
				    --paper-spinner-layer-4-color: ${BLUE};
				    --paper-spinner-color: ${BLUE};
				  }
			</style>
			<div class="modal history-modal">
				<h1>${command.command} log</h1>
				
				<div class="history">
					${history.length !== 0
						? html`
								${history.map((item) => {
									return html`
										<div style="display: flex; flex-direction: row; justify-content: space-between;">
											${item.byUser
												? html`
													<p><strong>${item.byUser}</strong></p>
													<p style="margin-left: 5px;">${item.updatedAt.replace(' ', ', ')}</p>
												`
												: html`
													<p><strong>First created:</strong></p>
												`
											}
										</div>
										<paper-item style="border-radius: 5px; background-color: #484b52; font-family: 'Nunito'; color: white; margin-bottom: 48px;" >
											<div style="width: 100%;" class="table table--3cols">
												<div style="display: flex; flex-direction: row; justify-content: space-between;">
													<h4 style="margin-bottom: 0px;">${item.clearance}</h4>
												</div>
												<div class="reply"><p>${item.reply}</p></div>
											</div>
										</paper-item>
									`;
								})}
						`
						: html`<div style="display: flex; justify-content: center;"><paper-spinner class="spinner-color" active></paper-spinner></div>`
					}
				</div>

			    <div class="buttons">
					<vaadin-button on-tap="${() => store.dispatch(closeModal())}" class="delete" dialog-dismiss autofocus>
					    <delete-icon slot="prefix" width="20" height="20" fill="white"></delete-icon>
					    Close
					</vaadin-button>
				</div>
			</div>
		`;
	}

	_stateChanged(state) {
		this.command = state.modal.command;
		this.username = state.auth.username;
	}
}

customElements.define('history-modal', HistoryModal);
