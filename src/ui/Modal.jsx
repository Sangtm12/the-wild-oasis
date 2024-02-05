import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { createPortal } from "react-dom";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const modalContext = createContext();

function Modal({ children }) {
  const [currentOpen, setCurrentOpen] = useState("");

  return (
    <modalContext.Provider value={{ currentOpen, setCurrentOpen }}>
      {children}
    </modalContext.Provider>
  );
}

export default Modal;

function Open({ children, opens }) {
  const { setCurrentOpen } = useContext(modalContext);
  return cloneElement(children, {
    onClick: () => {
      setCurrentOpen(opens);
    },
  });
}

function Window({ children, name }) {
  const { currentOpen, setCurrentOpen } = useContext(modalContext);
  const ref = useOutsideClick(() => {
    setCurrentOpen("");
  });

  return currentOpen === name
    ? createPortal(
        <Overlay>
          <StyledModal ref={ref}>
            <Button
              onClick={() => {
                setCurrentOpen("");
              }}
            >
              <HiXMark />
            </Button>
            {cloneElement(children, {
              onCloseModal: () => {
                setCurrentOpen("");
              },
            })}
          </StyledModal>
        </Overlay>,
        document.body
      )
    : null;
}

Modal.Open = Open;
Modal.Window = Window;
