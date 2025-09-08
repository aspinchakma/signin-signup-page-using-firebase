import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import auth from "../firebase_init";

const Header = ({ userInfo, setUserInfo }) => {
  console.log(userInfo);
  const links = (
    <>
      <li>
        <NavLink to={``}>Home</NavLink>
      </li>
      <li>{!userInfo && <NavLink to={`/signin`}>Sign In</NavLink>}</li>
      <li>{!userInfo && <NavLink to={`/signup`}>Sign Up</NavLink>}</li>
    </>
  );

  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUserInfo(null);
    });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {userInfo ? (
          <div className="flex items-center gap-2">
            {" "}
            <p className="font-bold">Welcome, {userInfo?.displayName}</p>
            <a onClick={handleLogOut} className="btn">
              Logout
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Header;
