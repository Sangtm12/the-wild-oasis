import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../context/darkModeContext";

function DarkModeToggle() {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={() => setIsDarkMode((d) => !d)}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
