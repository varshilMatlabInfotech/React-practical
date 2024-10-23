import React, { useState } from 'react';
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
} from 'reactstrap';

function Navbar(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <Nav tabs>
      <NavItem>
        <NavLink href="/" active>
          Home
        </NavLink>
      </NavItem>
 
    
      <NavItem>
        <NavLink href="/bookmark">Bookmark</NavLink>
      </NavItem>
    
    </Nav>
  );
}

export default Navbar;