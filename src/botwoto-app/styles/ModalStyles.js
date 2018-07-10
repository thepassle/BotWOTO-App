import { html } from '@polymer/lit-element';
import { GREEN, RED } from './Colors';

export const ModalStyles = html`<style>
	.modal {
		display: flex; 
		flex-direction: column; 
		padding: 16px;
	}

	vaadin-button[disabled]{
		background-color: #484b52;
	}

	vaadin-button {
		cursor: pointer; 
		align-self: flex-start; 
		margin-top: 24px; 
		color: white; 
		margin-right: 8px;
	}

	.edit {
		background-color: ${GREEN};
	}

	.delete {
		background-color: ${RED};
	}

	.buttons {
		display: flex; 
		flex-direction: row;
	}

	vaadin-text-area {
		min-height: 150px; 
		max-height: 250px;
	}

	vaadin-text-field {
		width: 37ch;
	}

	h1{
		color: white;
	}

	p {
		color: white;
	}

	@media only screen and (max-width: 600px) {
	    vaadin-text-field {
	      width: 100%;
	    }
	}
</style>`