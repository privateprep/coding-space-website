import React, { useState, useEffect } from "react";
import { Location } from "@reach/router";
import { Link } from "gatsby";
import logo from "../img/logo.svg";
// import menu from "../img/menu-icon.svg";
import "./Navbar.scss";

const Navigation = ({ location, menuItems }) => {
  const [active, setActive] = useState(false);
  const [activeSubNav, setActiveSubNav] = useState(false);
  const [currentPath, setCurrentPath] = useState(false);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathName]);

  const handleMenuToggle = () => setActive(!active);

  const handleLinkClick = () => active && handleMenuToggle();

  const handleLinkKeyDown = ev => {
    if (ev.keyCode === 13) {
      active && handleMenuToggle();
    }
  };

  const toggleSubNav = subNav => {
    setActiveSubNav(activeSubNav === subNav ? false : subNav);
  };

  const keyToggleSubNav = (ev, subNav) => {
    if (ev.keyCode === 79 || ev.keyCode === 27) {
      toggleSubNav(subNav);
    }
  };

  const NavLink = ({ to, className, children, ...props }) => (
    <Link
      to={to}
      className={`NavLink ${to === currentPath ? "active" : ""} ${className}`}
      onClick={handleLinkClick}
      onKeyDown={handleLinkKeyDown}
      tabIndex={0}
      aria-label="Navigation"
      role="button"
      {...props}
    >
      {children}
    </Link>
  );

  const SubGroup = ({ subMenu, title }) => {
    return (
      <div className={`Nav--Group ${activeSubNav === title ? "active" : ""}`}>
        <span
          className={`NavLink Nav--GroupParent`}
          onClick={() => toggleSubNav(title)}
          onKeyDown={e => keyToggleSubNav(e, title)}
          tabIndex={0}
          aria-label="Navigation"
          role="button"
        >
          {title}
          <div className="Nav--GroupLinks">
            {subMenu.map(({ title, path }) => (
              <NavLink key={path} to={path}>
                {title}
              </NavLink>
            ))}
          </div>
        </span>
      </div>
    );
  };

  return (
    <nav className={`Nav ${active ? "Nav-active" : ""}`}>
      <div className="Nav--Container container">
        <Link
          to="/"
          onClick={handleLinkClick}
          onKeyDown={handleLinkKeyDown}
          tabIndex={0}
          aria-label="Navigation"
          role="button"
        >
          <img
            src={logo}
            alt="The Coding Space Logo"
            style={{ width: "100%" }}
          />
        </Link>
        <div className="Nav--Links">
          {menuItems.map(({ title, path, subMenu }) => (
            <React.Fragment>
              {!path ? (
                <SubGroup subMenu={subMenu} title={title} />
              ) : (
                <NavLink key={path} to={path}>
                  {title}
                </NavLink>
              )}
            </React.Fragment>
          ))}
        </div>
        <button
          className="Button-blank Nav--MenuButton"
          onClick={handleMenuToggle}
          tabIndex={0}
          aria-label="Navigation"
        >
          {active ? (
            <svg
              className="x-icon nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
          ) : (
            <svg className="burger-icon nav-icon" viewBox="0 0 32 32">
              <rect x="2" y="4" width="28" height="4"></rect>
              <rect x="2" y="14" width="28" height="4"></rect>
              <rect x="2" y="24" width="28" height="4"></rect>
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default ({ menuItems }) => (
  <Location>
    {route => <Navigation menuItems={menuItems} {...route} />}
  </Location>
);
