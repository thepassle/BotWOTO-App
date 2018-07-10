import { LitElement, html } from '@polymer/lit-element/';
import { unsafeHTML } from 'lit-html/lib/unsafe-html';

import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-tooltip/paper-tooltip.js';

import { SharedStyles } from './../styles/SharedStyles';
import { CommandContainerStyles } from './../styles/CommandContainerStyles';

import { RED, GREEN } from './../styles/Colors';

import './no-results';

import './../assets/delete-icon';
import './../assets/edit-icon';
import './../assets/mod-icon';
import './../assets/sub-icon';

import { openModal } from '../../actions/modal.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import { emotes } from './../assets/emotes';

class BotwotoCommandsList extends connect(store)(LitElement) {

	static get properties() {
		return {
			commands: Array,
			isLoggedIn: Boolean,
			search: String
		}
	}

	constructor() {
		super();
		this.commands = [];
		this.isLoggedIn = false;
		this.search = '';
	}

	_filteredCommands(search) {
		return this.commands.filter((command) => {
        	return command.command.toLowerCase().includes(search.toLowerCase()) || command.reply.toLowerCase().includes(search.toLowerCase());
        });
	}

	_injectEmotes(reply) {
		reply.split(' ').forEach((word) => {
			if(emotes[word]){
				reply = reply.replace(word, emotes[word]);
			}
		});
		return unsafeHTML(reply);
	}

	_render({commands, isLoggedIn, search}) {
		return html`
			${SharedStyles}
			${CommandContainerStyles}
			
			<paper-item class="mb-hidden">
				<div class="table table--3cols">
					<div class="table-cell command"><h4>Command</h4></div>
					<div class="table-cell clearance"><h4>User</h4></div>
					<div class="table-cell reply"><h4>Reply</h4></div>
				</div>
			</paper-item>

			${ this._filteredCommands(search).length === 0 ? html`<no-results></no-results>` : ''}

			${ this._filteredCommands(search).map((command) => html`
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
						<div class="table-cell reply">${this._injectEmotes(command.reply)}</div>
						${isLoggedIn 
							? html`
								<div class="edit">
									<edit-icon on-tap="${() => store.dispatch(openModal({command, mode: 'edit'}))}" width="24" height="24" fill="${GREEN}"></edit-icon>
								</div>
								<div class="delete">
									<delete-icon on-tap="${() => store.dispatch(openModal({command, mode: 'delete'}))}" width="24" height="24" fill="${RED}"></delete-icon>
								</div>
								` 
							: html`
								<div style="width:48px; max-width:48px; min-width:48px;" class="edit">
									
								</div>
								` 
						}
					</div>
				</paper-item>
			`)}
		`;
	}

	_stateChanged(state) {
		this.isLoggedIn = state.auth.isLoggedIn;
		this.search = state.commands.search;
	}

}

customElements.define('botwoto-commands-list', BotwotoCommandsList);
