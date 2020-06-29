import React, { useState } from 'react';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom"; 
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const NavBar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto text-white">D' VTU Credit Ltd</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink className="text-white" href="#"><LiveHelpIcon/>FAQ</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-white" href="#"><ContactMailIcon/>Contact us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-white" href="/pages/dashboard/Landing/"><AccountCircleIcon/>My Account</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;