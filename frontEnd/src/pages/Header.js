import React, { useState } from "react";
import { Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { BiDownArrow } from "react-icons/bi";
import { AiFillCaretDown } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
function Header({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const userDropDown = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <nav className="header">
      <div style={{ marginLeft: "10px", marginTop: "13px" }}>
        {/* <img className="logo" src={require("../ML-LOGO.png")} /> */}
        <h3>Laser ERP</h3>
      </div>
      {user && (
        <div style={{ marginRight: "50px" }}>
          <Button
            id="resources-button"
            aria-controls={userDropDown ? "resources-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={userDropDown ? "true" : undefined}
            endIcon={<AiFillCaretDown />}
            style={{ color: "black" }}
            onClick={handleClick}
          >
            {`Hi, ${true ? "Admin" : "Guest"}`}
            {/* {`Hi, ${user.isAdmin ? 'Admin' : user.isDeveloper ? 'Dev' : user.isnormalUser ? 'User': 'Guest' }`} */}
          </Button>
          <Menu
            id="resources-menu"
            anchorEl={anchorEl}
            open={userDropDown}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            MenuListProps={{
              "aria-labelledby": "resources-button",
            }}
          >
            <Link to="/" className="text-link">
              {" "}
              <MenuItem onClick={handleClose}>
                {" "}
                <FiLogOut /> Logout
              </MenuItem>
            </Link>
            <Link to="/profile" className="text-link">
              {" "}
              <MenuItem onClick={handleClose}>
                {" "}
                <CgProfile /> Profile
              </MenuItem>
            </Link>
          </Menu>
        </div>
      )}
    </nav>
  );
}

export default Header;
