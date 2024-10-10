import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <main
      style={{
        height: "100%",
      }}
    >
      <Outlet />

    </main>
  );
};
