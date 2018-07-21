import { html } from '@polymer/lit-element';
import { BLUE, GREEN, PURPLE, RED } from './Colors';

export const AppStyles = html`
<style>

  app-header{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:132px;
    color:#fff;
    background-color: #36393e;
    z-index: 1;
    font-weight:600;
  }

  paper-toast {
    background-color: #36393e;
  }

  paper-spinner.spinner-color {
    --paper-spinner-layer-1-color: ${BLUE};
    --paper-spinner-layer-2-color: ${BLUE};
    --paper-spinner-layer-3-color: ${BLUE};
    --paper-spinner-layer-4-color: ${BLUE};
    --paper-spinner-color: ${BLUE};
  }

  paper-dialog {
      background-color: #36393e;
      flex-direction: row;
  }

  .wrapper{
    margin-top: 132px;
    padding-top: 24px;
    display: flex;
    justify-content: center;
    padding-bottom: 50px;
    background-color: #484b52;
    color: #36393e;
  }

  .error-dialog h1{
    color: white;
  }

  app-toolbar{
    display: flex;
    justify-content: space-between;
  }

  .search-cont{
    display: flex;
    justify-content: center;
  }

  vaadin-text-field{
    margin-top: 8px;
    width: 40%;
  }

  .main {
    width: auto;
  }

  vaadin-button{
    cursor: pointer;
    color: white;
    background-color: ${PURPLE};
  }

  .delete {
    background-color: ${RED};
  }

  .add {
    background-color: ${GREEN};
    margin-right:4px
  }

  .error {
    cursor: default;
    user-select: none;
  }

  @media only screen and (max-width: 600px) {
    .main {
      width: 100%;
    }

    app-toolbar {
      justify-content: space-between;
    }

    .mb-hidden {
        display: none;
    }

    .search-cont {
      justify-content: flex-start;
    }

    vaadin-text-field {
      width: calc(100% - 95px);
    }

    paper-dialog {
      margin: 0px;
      max-width: 100%;
      min-width: 100%;
    }
  }

    @media only screen and (max-width: 700px) and (min-width: 600px) {
      #search-bar {
        width: 35%;
      }
    }

</style>
`;