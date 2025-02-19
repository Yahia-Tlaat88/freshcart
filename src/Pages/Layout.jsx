import { Outlet } from "react-router-dom";
import Nav from "./Commponents/Nav";
import { Fotter } from "./Commponents/Fotter";

export function Layout() {
  return (
    <>
      <Nav></Nav>
      <div className="container mx-auto py-20 ">
        <Outlet></Outlet>
      </div>

    </>
  );
}