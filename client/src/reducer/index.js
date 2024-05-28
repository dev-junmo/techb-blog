import { combineReducers } from "redux";

import post from './post';
import user from './user';

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
