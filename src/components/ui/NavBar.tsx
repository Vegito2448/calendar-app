import { GoSignOut } from "react-icons/go";

export const NavBar = () => {
  return (
    <div
      className="navbar navbar-dark bg-dark mb-4"
    >
      <span
        className="navbar-brand"
      >
        Jesús Peña
      </span>

      <button
        className="btn btn-outline-danger"
      >
        <GoSignOut />

        <span> Salir</span>
      </button>


    </div>
  );
};
