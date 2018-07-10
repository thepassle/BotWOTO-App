import {
  CLOSE_MODAL,
  OPEN_MODAL
} from '../actions/modal';

const initialState = {
  mode: '',
  command: {},
};

export default function modal(state = initialState, action) {
  switch(action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        mode: action.modal.mode,
        command: action.modal.command
      };
    case CLOSE_MODAL:
      return {
        ...state,
        mode: action.payload.mode,
        command: {},
      };
    default:
      return state;
  }
}