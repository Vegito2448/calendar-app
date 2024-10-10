import { FaTrash } from "react-icons/fa";


interface DeleteEventFabProps {
  onClick: () => void;
}

export const DeleteEventFab = ({ onClick }: DeleteEventFabProps) => {
  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={onClick}
    >
      <FaTrash
        size={25}

      />
      <span>Delete Event</span>
    </button>
  );
};
