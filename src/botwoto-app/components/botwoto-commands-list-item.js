import { LitElement, html } from '@polymer/lit-element/';

import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-dialog/paper-dialog.js';

import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';
import '@vaadin/vaadin-text-field/vaadin-text-area.js';


import { SharedStyles } from './../styles/SharedStyles';
import { CommandContainerStyles } from './../styles/CommandContainerStyles';

import { RED, GREEN } from './../styles/Colors';

import './edit-modal';
import './delete-modal';
import './no-results';

import './../assets/delete-icon';
import './../assets/edit-icon';
import './../assets/mod-icon';
import './../assets/sub-icon';

import { editCommand } from '../../actions/selected.js';
import { deleteCommand } from '../../actions/selected.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

class BotwotoCommandsListItem extends connect(store)(LitElement) {

	static get properties() {
		return {
			command: Array,
			isLoggedIn: Boolean
		};
	}

	constructor() {
		super();
		this.command = [];
		this.isLoggedIn = true;
	}

	_render({command, isLoggedIn}) {
		return html`
			${SharedStyles}
			${CommandContainerStyles}
			<style>

			</style>
			<paper-item>
				<div class="table table--3cols">
					<div class="table-cell command"><h4>${command.command}</h4></div>
					<div class="table-cell clearance">
						${command.clearance === 'mod' 
							? html`<mod-icon width="20" height="20"></mod-icon>`
							: command.clearance === 'sub' 
								? html`<sub-icon width="20" height="20"></sub-icon>` 
								: ''
						}
					</div>
					<div class="table-cell reply">${command.reply}</div>
					${isLoggedIn 
						? html`
							<div class="edit">
								<edit-icon on-tap="${() => store.dispatch(editCommand(command))}" width="24" height="24" fill="${GREEN}"></edit-icon>
							</div>
							<div class="delete">
								<delete-icon on-tap="${() => store.dispatch(deleteCommand(command))}" width="24" height="24" fill="${RED}"></delete-icon>
							</div>
							` 
						: html`
							<div style="width:48px; max-width:48px; min-width:48px;" class="edit">
								
							</div>
							` 
						}
					</div>
				</paper-item>
		`;
	}

	_stateChanged() {
		// console.log(state);
	}

}

customElements.define('botwoto-commands-list-item', BotwotoCommandsListItem);
