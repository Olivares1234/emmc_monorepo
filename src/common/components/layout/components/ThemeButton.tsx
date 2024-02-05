import { FiMoon, FiSun } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useAppSelector } from "redux/hooks";

import { toggleTheme } from "../redux/layoutSlice";
import { selectScheme } from "../redux/selectors";

interface Props {
  adjustColor?: boolean;
}

ThemeButton.defaultProps = {
  adjustColor: true,
};

function ThemeButton({ adjustColor }: Props) {
  const scheme = useAppSelector(selectScheme);
  const dispatch = useDispatch();

  return (
    <div
      className="border-0 p-1.5 outline-none cursor-pointer"
      onClick={() => dispatch(toggleTheme())}
    >
      {scheme === "dark" ? (
        <FiSun className="text-white" size={18} />
      ) : (
        <FiMoon className={adjustColor ? "text-gray-700" : "text-white"} size={18} />
      )}
    </div>
  );
}

export default ThemeButton;
