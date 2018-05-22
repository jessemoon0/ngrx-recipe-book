import {AuthActions, LOGIN, LOGOUT, SET_TOKEN, SIGNUP} from './auth.actions';

export interface IAuthState {
  token: string;
  authenticated: boolean;
}

const initialState: IAuthState = {
  token: null,
  authenticated: false
};



export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SIGNUP:
    case LOGIN:
      return {
        ...state,
        authenticated: true
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        authenticated: false
      };
    case SET_TOKEN:
      return {
        ...state
      };
    default: {
      return state;
    }
  }
}
