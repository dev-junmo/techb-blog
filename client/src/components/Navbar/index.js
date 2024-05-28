import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ImExit } from 'react-icons/im';
import "./style.scss";
import { LOG_OUT_REQUEST } from "../../reducer/user";

const navData = [
  {
    id: 0,
    category: "All",
  },
  {
    id: 1,
    category: "Web",
  },
  {
    id: 2,
    category: "Server"
  },
  {
    id: 3,
    category: "Design"
  },
  {
    id: 4,
    category: "Tool"
  },
  {
    id: 5,
    category: "Etc"
  },
];

const Navbar = () => {
  const location = useLocation(); 
  const params = new URLSearchParams(location.search);
  const categoryParams = params.get("category");

  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // useEffect(() => {
  //   return navigate("/?category=All", { replace: true });
  // }, []);

  const onClickLogout = () => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }

  return (
    <header>
      <div className="header-container">
        <h1>&lt; TechB /&gt;</h1>
        <div className="right-container">
          <nav>
            <ul>
              { navData.map((el, i) => (
                <li key={el.id}>
                  <Link to={`/?category=${el.category}`} className={ el.category === categoryParams ? "active" : null }>{el.category}</Link>
                </li>
              )) }
              {/* <li>
                <NavLink to="/" activeclassname="active">
                  All
                </NavLink>
              </li>
              <li>
                <NavLink to="/?category=web" activeclassname="active">
                  Web
                </NavLink>
              </li>
              <li>
                <NavLink to="/server" activeclassname="active">
                  Server
                </NavLink>
              </li>
              <li>
                <NavLink to="/design" activeclassname="active">
                  Design
                </NavLink>
              </li>
              <li>
                <NavLink to="/tool" activeclassname="active">
                  Tool
                </NavLink>
              </li>
              <li>
                <NavLink to="/etc" activeclassname="active">
                  Etc
                </NavLink>
              </li> */}
            </ul>
          </nav>
          <div className="user-area">
            <div className="user-name">
              <span>{ me?.nickname }</span>님
            </div>
            <button className="logout-btn" onClick={onClickLogout}>
              <ImExit />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;