import { FaCirclePlus } from "react-icons/fa6";

interface AddNewFabProps {
  onClick: () => void;
}

export const AddNewFab = ({
  onClick,
}: AddNewFabProps) => {
  return (
    <button
      className="btn btn-primary fab"
      onClick={onClick}
    >

      <FaCirclePlus
        className="fab"
        size={60}
        color="green"
      />
    </button>
  );
};
