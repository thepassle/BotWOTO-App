import { html } from '@polymer/lit-element';

export const CommandContainerStyles = html`
<style>
	.table {
		display: flex;
		flex-wrap: nowrap;
		margin: 0 0 0 0;
		padding: 0;
		width: 100%;
	}

	paper-item {
		cursor: default;
	}

	.table-cell {
		padding: 8px;
		width: 100%;
		flex-grow: 0;
		flex-basis: 10%;
		overflow: hidden;
	}

	.clearance {
		padding-top: 8px;
		flex-basis:8%;
		display: flex;
	    justify-content: center;
	}

	.reply {
		flex-grow: 1;
		word-break: break-word;
		min-width: 27ch;
		max-width: 27ch;
		padding-right: 56px;
		cursor: pointer;
	}

	.command {
		min-width: 12ch;
		word-break: break-all;
		font-weight: 600;
	}

	paper-item:nth-child(even) {
		background: #f9f9f9;
	}

	paper-item:not(:first-of-type):hover {
		background: #f2f2f2;
	}

	paper-item:not(:first-of-type):hover .edit{
	    display: block;
	}

	paper-item:not(:first-of-type):hover .delete{
	    display: block;
	}

	paper-item:not(:first-of-type):hover .reply{
		padding-right: 8px;
	}

	.edit, .delete {
		color: #484b52;
		padding-top: 8px;
	    display: none;
	}

	edit-icon {
		cursor: pointer;
	}

	delete-icon{
		cursor: pointer;
	}

	h4{
		margin:0;
	}

	paper-dialog {
	    background-color: #36393e;
	    flex-direction: row;
	}

	mod-icon, sub-icon {
		margin-top: 4px;
	}

	img {
		width: 20px;
		display: inline-block;
	}

	@media only screen and (max-width: 600px) {
		.table {
			flex-wrap: wrap;
			justify-content: center;
		}

		.reply {
			min-width: 27ch;
			flex-basis: 100%;
			padding-right: 8px;
		}

		.clearance {
			justify-content: flex-end;
			flex-basis: calc(50% - 16px);
		}

		.edit {
			padding-left: 8px;
		}

		.delete {
		
		}

		.command {
			flex-basis: calc(50% - 16px);
		}
	}

	@media only screen and (max-width: 400px) {
		.table {
			justify-content: flex-start;
			padding-right: 8px;
		}

		.reply {
			min-width: 100%;
		}
	}
</style>`;