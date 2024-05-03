import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";
import useAuth from '../contexts/AuthContext';

const Navigation=()=> {
  const { isLoggedIn } = useAuth();

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/auth"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  logout
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/auth"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Login/create
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;