import React from "react";
import Login from "./Login";
import Logout from "./Logout";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import "../App.css";

export default function Header() {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <header>
        <div className="nav">
          <Profile />
          <div className="title-box"></div>
          <NavLink className="title" to="/">
            Movie React Application
          </NavLink>

          <div className="logo">
            <ul className="ul">
              {isAuthenticated ? (
                <>
                  <li className="a">
                    {" "}
                    <NavLink className="a" to="/watchlist">
                      WatchList
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="a" to="/watched">
                      Watched
                    </NavLink>
                  </li>
                </>
              ) : null}
              <li className="a">
                {isAuthenticated ? (
                  <Logout className="a" />
                ) : (
                  <Login className="a" />
                )}
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}
