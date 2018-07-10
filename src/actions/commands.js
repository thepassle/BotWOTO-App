import { closeModal } from './modal';
import { loggedIn } from './auth';
import axios from 'axios';

export const UPDATE_SEARCH = 'UPDATE_SEARCH';

export const updateSearch = search => ({
  type: UPDATE_SEARCH,
  payload: search
});

export const ADD_COMMAND_BEGIN   = 'ADD_COMMAND_BEGIN';
export const ADD_COMMAND_SUCCESS = 'ADD_COMMAND_SUCCESS';
export const ADD_COMMAND_FAILURE = 'ADD_COMMAND_FAILURE';


// all these are the same
// addcombegin, editcombegin, etc. Refactor pls.
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

export function addCommand(data) {
  return dispatch => {
    dispatch(addCommandBegin());
    return fetch("/api/commands", {
        method: "POST",
        headers: new Headers(
           {"Content-Type": "application/json"}
        ),
        body: JSON.stringify(data)
      }).then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(addCommandSuccess(json.data));
        dispatch(closeModal());
        setTimeout(() => {
          dispatch(resetToast());
        }, 3000);
        return json.data;
      })
      .catch(error => {
        dispatch(addCommandError({'error': true, 'message': error}));
        dispatch(closeModal());
      });
  };
}


export const DELETE_COMMAND_BEGIN   = 'DELETE_COMMAND_BEGIN';
export const DELETE_COMMAND_SUCCESS = 'DELETE_COMMAND_SUCCESS';
export const DELETE_COMMAND_FAILURE = 'DELETE_COMMAND_FAILURE';

export const deleteCommandBegin = () => ({
  type: DELETE_COMMAND_BEGIN
});

export const deleteCommandSuccess = command => ({
  type: DELETE_COMMAND_SUCCESS,
  payload: { command }
});

export const deleteCommandError = error => ({
  type: DELETE_COMMAND_FAILURE,
  payload: { error }
});

export function deleteCommand(data) {
  return dispatch => {
    dispatch(deleteCommandBegin());
    return fetch(`/api/commands/${data.command}`, {
        method: "DELETE",
        headers: new Headers(
           {"Content-Type": "application/json"}
        ),
        body: JSON.stringify(data)
      }).then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(deleteCommandSuccess(json.data));
        dispatch(closeModal());
        setTimeout(() => {
          dispatch(resetToast());
        }, 3000);
        return json.data;
      })
      .catch(error => {
        // reset error state when closed error dialog
        dispatch(deleteCommandError({'error': true, 'message': error}));
        dispatch(closeModal());
      });
  };
}

export const EDIT_COMMAND_BEGIN   = 'EDIT_COMMAND_BEGIN';
export const EDIT_COMMAND_SUCCESS = 'EDIT_COMMAND_SUCCESS';
export const EDIT_COMMAND_FAILURE = 'EDIT_COMMAND_FAILURE';

export const editCommandBegin = () => ({
  type: EDIT_COMMAND_BEGIN
});

export const editCommandSuccess = command => ({
  type: EDIT_COMMAND_SUCCESS,
  payload: { command }
});

export const editCommandError = error => ({
  type: EDIT_COMMAND_FAILURE,
  payload: { error }
});

export function editCommand(data) {
  return dispatch => {
    dispatch(editCommandBegin());
    return fetch(`/api/commands/${data.command}`, {
        method: "PUT",
        headers: new Headers(
           {"Content-Type": "application/json"}
        ),
        body: JSON.stringify(data)
      }).then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(editCommandSuccess(json.data));
        dispatch(closeModal());
        setTimeout(() => {
          dispatch(resetToast());
        }, 4000);
        return json.data;
      })
      .catch(error => {
        dispatch(editCommandError({'error': true, 'message': error}));
        dispatch(closeModal());
      });
  };
}

export const FETCH_COMMANDS_BEGIN   = 'FETCH_COMMANDS_BEGIN';
export const FETCH_COMMANDS_SUCCESS = 'FETCH_COMMANDS_SUCCESS';
export const FETCH_COMMANDS_FAILURE = 'FETCH_COMMANDS_FAILURE';

export const fetchCommandsBegin = () => ({
  type: FETCH_COMMANDS_BEGIN
});

export const fetchCommandsSuccess = commands => ({
  type: FETCH_COMMANDS_SUCCESS,
  payload: { commands }
});

export const fetchCommandsError = error => ({
  type: FETCH_COMMANDS_FAILURE,
  payload: { error }
});

export function fetchCommands() {
  return dispatch => {
    dispatch(fetchCommandsBegin());
    return axios.get('/api/commands')
      .then(json => {
        console.log(json);
        ///////////////////////////////////////////////////////////////////////////////////////////////
        if(json.data.hasOwnProperty('user')){
          console.log('has user');
          dispatch(loggedIn(json.data.user));          
        }
        dispatch(fetchCommandsSuccess(json.data.data));
        return json.data.data;
      })
      .catch(error => dispatch(fetchCommandsError(error)));
  };
}

export const RESET_ERROR = 'RESET_ERROR';
export const RESET_TOAST = 'RESET_TOAST';

export const resetError = () => ({
  type: RESET_ERROR
});

export const resetToast = () => ({
  type: RESET_TOAST
});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}