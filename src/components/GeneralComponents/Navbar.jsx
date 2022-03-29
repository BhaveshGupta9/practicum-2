import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

  function homeButtonClick(){
    return navigate("/takemeto");
  }
  
  return (
    <div className="navbar">
      <nav>
        <span onClick={homeButtonClick}><h1 className="app-name">rendezvous</h1></span>
      </nav>
    </div>
  );
};

export default Navbar;
