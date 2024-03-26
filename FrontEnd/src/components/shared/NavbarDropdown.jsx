import React from 'react';
import './NavbarDropdown.scss'; 

const NavbarDropdown = ({text1,text2,text3}) => {
  return (
    <div className="bigmain">
      <div className="nav-dropdown">
          <h4>{text1}</h4>
          <h4>{text2}</h4>
          <h4>{text3}</h4>       
      </div>
    </div>
  );
}

export default NavbarDropdown;


