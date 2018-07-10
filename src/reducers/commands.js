import {
  FETCH_COMMANDS_BEGIN,
  FETCH_COMMANDS_SUCCESS,
  FETCH_COMMANDS_FAILURE,

  ADD_COMMAND_BEGIN,
  ADD_COMMAND_SUCCESS,
  ADD_COMMAND_FAILURE,

  DELETE_COMMAND_BEGIN,
  DELETE_COMMAND_SUCCESS,
  DELETE_COMMAND_FAILURE,

  EDIT_COMMAND_BEGIN,
  EDIT_COMMAND_SUCCESS,
  EDIT_COMMAND_FAILURE,

  UPDATE_SEARCH,
  RESET_ERROR,
  RESET_TOAST
} from '../actions/commands';

const initialState = {
  items: [],
  search: '',
  loading: true,
  updateLoading: false,
  error: { error: false, message: "" },
  updateError: { error: false, message: "" },
  toast: { show: false, message: "" }
};

export default function commands(state = initialState, action) {
  switch(action.type) {
    case RESET_ERROR:
      return {
        ...state,
        updateError: { error: false, message: "" }
      };
    case UPDATE_SEARCH:
      return {
        ...state,
        search: action.payload,
      };

    case DELETE_COMMAND_BEGIN:
    case EDIT_COMMAND_BEGIN:
    case ADD_COMMAND_BEGIN:
      return {
        ...state,
        updateLoading: true
      };

    case DELETE_COMMAND_FAILURE:
    case EDIT_COMMAND_FAILURE:
    case ADD_COMMAND_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateError: { error: true, message: action.payload.error.message },
        search: state.search
      };

    case ADD_COMMAND_SUCCESS:
      let newItems = [...state.items, action.payload.command];
      newItems.sort((a, b) => a.command.localeCompare(b.command))
      return {
        ...state,
        updateLoading: false,
        updateError: { error: false, message: "" },
        items: newItems,
        toast: { show: true, message: `Successfully added command: ${action.payload.command.command}` }
      };

    case EDIT_COMMAND_SUCCESS:
      let newState = state.items.map((command) => { 
              return command.command === action.payload.command.command ? action.payload.command : command;
            });
      return {
        ...state,
        updateLoading: false,
        updateError: { error: false, message: "" },
        items: newState,
        search: state.search,
        toast: { show: true, message: `Successfully edited command: ${action.payload.command.command}` }
      };

    case DELETE_COMMAND_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateError: { error: false, message: "" },
        items: state.items.filter((item) => {
          return item.command !== action.payload.command.command
        }),
        search: '',
        toast: { show: true, message: `Successfully deleted command: ${action.payload.command.command}` }
      };

    case RESET_TOAST:
      return {
        ...state,
        toast: { show: false, message: "" }
      }

    case FETCH_COMMANDS_BEGIN:
      return {
        ...state,
        loading: true,
        error: { error: false, message: "" },
      };
    case FETCH_COMMANDS_SUCCESS:
      // let test = Object.assign({}, ...action.payload.commands.map(command => ({[command.command]: command})));
      return {
        ...state,
        loading: false,
        error: { error: false, message: "" },
        items: action.payload.commands,
      };
    case FETCH_COMMANDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: { error: true, message: "Something went wrong! :(" },
        items: []
      };
    default:
      return state;
  }
}


export const addCommandBegin = () => ({
  type: ADD_COMMAND_BEGIN
});

export const addCommandSuccess = command => ({
  type: ADD_COMMAND_SUCCESS,
  payload: { command }
});

export const addCommandError = error => ({
  type: ADD_COMMAND_FAILURE,
  payload: { error }
});