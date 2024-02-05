import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogOut from "./useLogOut";
import SpinnerMini from "../../ui/SpinnerMini";

function LogOut() {
  const { logOut, isLoading } = useLogOut();
  return (
    <ButtonIcon onClick={logOut} disabled={isLoading}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default LogOut;
