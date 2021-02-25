/**
 * REDUX ACTIONS
 *
 * Contains all the actions to be dispatched to the reducer - to updated global Redux state
 */

import {SET_MAIN_DATA, SET_FILTER_VALUE} from '@constants/Constants';

export const setMainData = (data) => ({
  type: SET_MAIN_DATA,
  payload: data,
});

export const setFilterValue = (value = null) => ({
  type: SET_FILTER_VALUE,
  payload: value,
});
