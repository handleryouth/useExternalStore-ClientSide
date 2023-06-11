import { useSyncExternalStore } from "react";
import { StoreProps } from "./types";
import store from "./store";

export interface IncrementValueProps {
  value: keyof StoreProps;
}

// used useSyncExternalStore hook version

function useStore(selector: keyof StoreProps) {
  return useSyncExternalStore(
    store.subscribe,
    () => store.getState()[selector]
  );
}

// not used useSyncExternalStore hook version

// function useStore(selector: keyof StoreProps) {
//   const [state, setState] = useState(store.getState()[selector]);

//   console.log("listener in state", store.listeners);

//   useEffect(() => {
//     const unsubscribe = store.subscribe((state) => setState(state[selector]));
//     return unsubscribe;
//   }, []);
//   return state;
// }

function DisplayValue({ value }: IncrementValueProps) {
  return (
    <div>
      {value}: {useStore(value)}
    </div>
  );
}

function IncrementValue({ value }: IncrementValueProps) {
  return (
    <button
      onClick={() => {
        const storedState = store.getState();
        store.setState({
          ...storedState,
          [value]: storedState[value] + 1,
        });
      }}
    >
      Increment {value}
    </button>
  );
}

function App() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        maxWidth: 600,
        gap: "1rem",
      }}
    >
      <IncrementValue value="value1" />
      <DisplayValue value="value1" />

      <IncrementValue value="value2" />
      <DisplayValue value="value2" />
    </div>
  );
}

export default App;
