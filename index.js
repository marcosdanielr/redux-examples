const { createStore } = require("redux");

// Actions and Acitons TYPE
const CHANGE_USER = 'CHANGE_USER';
const LOGOUT = 'LOGOUT';

// Actions
function changeUser(user) {
  return {
    type: CHANGE_USER,
    info: "Change the current user",
    payload: user
  }
}

function logout() {
  return {
    type: LOGOUT,
    info: "Logout the current user"
  }
}

const initialState = {
  user: '',
  isLogged: false,
}

// Reducers
function userReducer(prevState = initialState, action) {
  switch (action.type) {
    case CHANGE_USER:
      return {
        ...prevState,
        user: action.payload,
        isLogged: true,
      }
    case LOGOUT:
      return {
        ...prevState,
        user: '',
        isLogged: false
      }
    default:
      return prevState;
  }
}

// testing reducers with const
function userReducerConst(prevState = initialState, action) {
  const USER_REDUCERS_CONST = {
    ...prevState,
    user: action.type == 'CHANGE_USER' ? action.payload : '',
    isLogged: action.type == 'CHANGE_USER',
  }

  if (USER_REDUCERS_CONST) {
    return USER_REDUCERS_CONST;
  }
  return prevState;
}

// Store
const store = createStore(userReducer);
const storeConst = createStore(userReducerConst);

console.log("Initial state", store.getState());
store.dispatch(changeUser("Opa"));
console.log("State updated", store.getState());
store.dispatch(logout());
console.log("After logout", store.getState());

console.log("Initial state - const", storeConst.getState());
storeConst.dispatch(changeUser("Opa - const"));
console.log("State updated - const", storeConst.getState());
storeConst.dispatch(logout());
console.log("After logout - const", storeConst.getState());

