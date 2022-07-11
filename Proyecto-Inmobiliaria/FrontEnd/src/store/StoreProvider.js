import React, { createContext, useContext, useReducer, useEffect } from "react";
import StoreReducer, { initialStore } from "./StoreReducer";

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer( StoreReducer, JSON.parse(localStorage.getItem("store")) || initialStore );

  useEffect(() => {
    localStorage.setItem("store", JSON.stringify(store));
  }, [store]);

  return (
    <StoreContext.Provider value={[store, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => useContext(StoreContext)[0];
const useDispatch = () => useContext(StoreContext)[1];

export { StoreContext, useStore, useDispatch };

export default StoreProvider;
