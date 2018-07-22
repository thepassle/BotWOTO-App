import { LitElement, html } from '@polymer/lit-element/';

import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-text-field/vaadin-text-field.js';

import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-toast/paper-toast.js';

import './components/botwoto-commands-list';
import './components/add-modal';
import './components/edit-modal';
import './components/delete-modal';

import './assets/twitch-icon';
import './assets/search-icon';
import './assets/add-icon';
import './assets/logout-icon';

import { AppStyles } from './styles/AppStyles';
import { SharedStyles } from './styles/SharedStyles';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';

import { openModal } from '../actions/modal.js';
import { updateSearch, fetchCommands, resetError } from '../actions/commands.js';
import { logout } from '../actions/auth.js';

class BotWotoApp extends connect(store)(LitElement) {

	static get properties() {
		return {
			commands: Array,
			search: String,
			loading: Boolean,
			isLoggedIn: Boolean,
			isMod: Boolean,
			error: Object,
			modalMode: String,
			selectedCommand: Object,
			updateLoading: Boolean,
			updateError: Boolean,
			updateErrorMsg: String,
			toastVisible: Boolean,
			toastMessage: String
		};
	}

	// make action creators for store.dispatch(openModal({command, mode})) it can be nicer

	// refactor
	// tests

	_firstRendered() {
		store.dispatch(fetchCommands());
	}

	_search() {
		const query = this.shadowRoot.getElementById('search-bar').value;

		store.dispatch(updateSearch(query));
	}

	handleLogin() {
		window.location.href = '/auth/twitch';
	}

	handleLogout() {
		window.location.href = '/auth/logout';
		store.dispatch(logout());
	}

	_render({commands, search, loading, error, isLoggedIn, isMod, modalMode, selectedCommand, updateLoading, updateError, updateErrorMsg, toastVisible, toastMessage}) {
		return html`
			${AppStyles}
			${SharedStyles}

			<app-header shadow condenses fixed>
				<app-toolbar>
					<h3>BotWOTO</h3>
					<div>
						${isLoggedIn
							?
							isMod ?
								html`<vaadin-button theme="icon" on-tap="${() => store.dispatch(openModal({command: {}, mode: 'add'}))}" class="add" dialog-confirm autofocus>
									    <add-icon slot="prefix" width="20" height="20" fill="white"></add-icon>
									    <span class="mb-hidden">Add</span>
									</vaadin-button>
									<vaadin-button on-tap="${() => this.handleLogout()}" theme="icon">
										<logout-icon slot="prefix" width="15" height="15"></logout-icon>
										<span class="mb-hidden">Logout</span>
									</vaadin-button>`
									:
									html`<vaadin-button on-tap="${() => this.handleLogout()}" theme="icon">
										<logout-icon slot="prefix" width="15" height="15"></logout-icon>
										<span class="mb-hidden">Logout</span>
									</vaadin-button>`
							: html`<vaadin-button on-tap="${() => this.handleLogin()}"><twitch-icon slot="prefix" width="15" height="15"></twitch-icon><span>Login</span></vaadin-button>`
						}
					</div>
				</app-toolbar>

				<app-toolbar class="search-cont">
					<vaadin-text-field placeholder="Search" id="search-bar" on-input="${() => this._search()}" value=${search}>
						<div slot="suffix"><search-icon width="20" height="20" on-click="${() => this._search()}"></search-icon></div>
					</vaadin-text-field>
				</app-toolbar>
			</app-header>

			<div class="wrapper">
				${loading
					? html`<paper-spinner class="spinner-color" active></paper-spinner>`
					: error.error
						? html`<div class="error">${error.message}<div>`
						: html`<paper-card class="main">
								<botwoto-commands-list commands=${commands}></botwoto-commands-list>
								</paper-card>`
				}
			</div>

			<paper-toast text="${toastMessage}" opened="${toastVisible}" duration="0"></paper-toast>

			<paper-dialog opened="${modalMode}" modal>
				${modalMode === 'add' ? html`<add-modal></add-modal>` : ''}
				${modalMode === 'edit' ? html`<edit-modal command=${selectedCommand}></edit-modal>` : ''}
				${modalMode === 'delete' ? html`<delete-modal command=${selectedCommand}></delete-modal>` : ''}
			</paper-dialog>

			<paper-dialog class="update-loading" opened=${updateLoading} modal>
				<paper-spinner class="spinner-color" active></paper-spinner>
			</paper-dialog>

			<paper-dialog opened=${updateError} modal>
				<div class="error-dialog">
					<h1>${updateErrorMsg}</h1>
					<vaadin-button on-tap="${() => store.dispatch(resetError())}" class="delete" dialog-dismiss autofocus>
					    Close
					</vaadin-button>
				</div>
			</paper-dialog>
		`;
	}

	_stateChanged(state) {
		this.commands = state.commands.items;
		this.loading = state.commands.loading;
		this.error = state.commands.error;

		this.modalMode = state.modal.mode;
		this.selectedCommand = state.modal.command;

		this.updateLoading = state.commands.updateLoading;
		this.updateError = state.commands.updateError.error;
		this.updateErrorMsg = state.commands.updateError.message;

		this.search = state.commands.search;

		this.isLoggedIn = state.auth.isLoggedIn;
		this.isMod = state.auth.isMod;

		this.toastVisible = state.commands.toast.show;
		this.toastMessage = state.commands.toast.message;
	}

}

customElements.define('botwoto-app', BotWotoApp);
