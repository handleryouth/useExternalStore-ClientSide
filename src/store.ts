import { StoreProps } from "./types";

function createStore<T>(initialState: T) {
  let currentState = initialState;

  // set is used to store unique values

  const listeners: Set<(value: T) => void> = new Set();

  console.log("listeners in create store", listeners);

  const getState = () => currentState;
  const setState = (newState: T) => {
    currentState = newState;
    listeners.forEach((listener) => listener(currentState));
  };

  /*
  the return value of subscribe is a function that removes the listener from the set
  */

  const subscribe = (listener: (value: T) => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  return { getState, setState, subscribe, listeners };
}

const store = createStore<StoreProps>({
  value1: 0,
  value2: 0,
});

export default store;
