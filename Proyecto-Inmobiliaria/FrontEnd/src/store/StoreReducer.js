export const initialStore = {
  user: {
    id: null,
    name: null,
    lastName: null,
    email: null,
    tokenJwt: null,
    rol: null,
  },
  isLogged: false,
  favs: [],
};

export const types = {
  authLogin: "auth - login",
  authLogout: " auth - logout",
  favsDeleteAll: "favs - delete all",
  favsAdd: "fav - change",
};

const StoreReducer = (state, action) => {
  switch (action.type) {
    case types.authLogout:
      return {
        ...state,
        user: {
          id: null,
          name: null,
          lastName: null,
          email: null,
          tokenJwt: null,
          rol: null,
        },
        isLogged: false,
        favs: [],
      };
    case types.authLogin:
      return {
        ...state,
        isLogged: true,
        user: action.payload,
      };
    case types.favsDeleteAll:
      return {
        ...state,
        favs: [],
      };
    case types.favsAdd:
      return {
        ...state,
        favs: [...state.favs, action.payload].flat(),
      };
    default:
      return state;
  }
};

export default StoreReducer;
