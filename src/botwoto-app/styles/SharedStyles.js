import { html } from '@polymer/lit-element';

export const SharedStyles = html`
<style>
	* {
		font-family: 'Nunito';
	}

	@media only screen and (max-width: 600px) {
		.mb-hidden {
			display: none;
		}

		paper-item:hover .reply{
			padding-right:50px;
		}
	}
</style>

<dom-module id="my-text-field" theme-for="vaadin-text-field">
  <template>
    <style>
		[part="input-field"] {
			background-color: #484b52;
			color: white;
		}

		[part="label"] {
			color: white;
		}

		:host([focused]:not([readonly])) [part="label"]{
			color: white;
		}

		:host(:hover:not([readonly]):not([focused])) [part="label"]{
			color: white;
		}

		[part="label"]:hover {
			color: white;
		}
    </style>
  </template>
</dom-module>

<dom-module id="my-text-" theme-for="vaadin-text-area">
  <template>
    <style>
		[part="input-field"] {
			background-color: #484b52;
			color: white;
		}

		[part="label"] {
			color: white;
		}

		:host([focused]:not([readonly])) [part="label"]{
			color: white;
		}

		:host(:hover:not([readonly]):not([focused])) [part="label"]{
			color: white;
		}

		[part="label"]:hover {
			color: white;
		}

		:host(:hover:not([readonly]):not([focused])) [part="input-field"]{
			background-color: #484b52;
		}
    </style>
  </template>
</dom-module>


<dom-module id="my--field" theme-for="vaadin-button">
  <template>
    <style>
    	:host([focus-ring]) {
    		box-shadow: none;
	    }

	    [part="label"] {
	    	/*padding-left: 5px;*/
	    	padding-right: 5px;
		}

		@media only screen and (max-width: 600px) {
			[part="label"] {
				padding-left: 0px;
				padding-right: 0px;
			}
		}


		[part="prefix"] {
			padding-top:5px;
		}
    </style>
  </template>
</dom-module>
`;