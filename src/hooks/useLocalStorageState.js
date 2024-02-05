import { useEffect, useState } from "react";

export function useLocalStorageState(stateName, initialState) {
  const [value, setValue] = useState(function () {
    const currentLocalState = window.localStorage.getItem(stateName);
    if (currentLocalState === "false") {
      return false;
    } else if (currentLocalState === "true") {
      return true;
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(stateName, value);
  }, [stateName, value]);

  return [value, setValue];
}
