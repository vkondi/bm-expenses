/**
 * REDUX REDUCER
 *
 * Defines the initial state of Redux and contains reducer method to update the state.
 */

import {combineReducers} from 'redux';

import {SET_MAIN_DATA, SET_FILTER_VALUE} from '@constants/Constants';

const INITIAL_STATE = {
  mainData: null,
  filterValue: null,
  currentShortMonth: new Date().toLocaleString('default', {
    month: 'short',
  }),
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MAIN_DATA:
      return {
        ...state,
        mainData: action?.payload ?? null,
      };
    case SET_FILTER_VALUE:
      return {
        ...state,
        filterValue: action?.payload ?? null,
      };
    default:
      return state;
  }
};

export default combineReducers({
  reduxState: reducer,
});
