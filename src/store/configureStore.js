import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { combineReducers, createStore} from 'redux'
import userRegisterReducer from '../reducer/userRegisterReducer'
import userLoginReducer from '../reducer/userLoginReducer'
import { userReducer, userNotesReducer } from '../reducer/userReducer'
  
const configureStore =()=>{
    const store = createStore(combineReducers({
       userRegister : userRegisterReducer,
       userLogin : userLoginReducer,
       user : userReducer,
       notes : userNotesReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore