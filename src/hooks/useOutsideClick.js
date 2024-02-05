import { useEffect, useRef } from "react";

export default function useOutsideClick(closeFn) {
  const ref = useRef();

  useEffect(() => {
    function handleOutsideClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        closeFn();
      }
    }

    window.addEventListener("click", handleOutsideClick, false);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [closeFn]);

  return ref;
}
