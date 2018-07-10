import {
  LOGGED_IN,
  LOGGED_OUT
} from '../actions/auth';

const initialState = {
  isLoggedIn: false,
  isMod: false,
  username: '',
  avatar: ''
};

export default function auth(state = initialState, action) {
  switch(action.type) {
  	case LOGGED_IN:
  	  return {
  	  	...state,
  	  	isLoggedIn: true,
  	  	isMod: true,
  	  	username: action.user.display_name,
  	  	avatar: action.user.logo
  	  };
  	case LOGGED_OUT:
  	  return {
  	  	...state,
  	  	isLoggedIn: false,
  	  	isMod: false,
  	  	username: '',
  	  	avatar: ''
  	  };
    default:
      return state;
  }
}