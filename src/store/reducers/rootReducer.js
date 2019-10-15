import { combineReducers } from 'redux';

import authReducer from './authReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    message: messageReducer
})

export default rootReducer;