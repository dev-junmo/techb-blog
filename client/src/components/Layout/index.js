import { Outlet } from "react-router-dom";
import Navbar from '../Navbar';
import "./style.scss";

const Layout = () => {
  return (
    <div className="container">
      <Navbar />

      <Outlet />
    </div>
  );
}

export default Layout;