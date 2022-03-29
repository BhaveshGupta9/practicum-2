import React, {useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import Button from "../components/UI/Button";
import Navbar from "../components/GeneralComponents/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { auth, signInWithGoogle } from "../login";
import { useAuthState } from "react-firebase-hooks/auth";


const Auth = () => {

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/profile");
  }, [user, loading]);

  return (
    <div>
      <Navbar />
      <div className="login_parent">
        <div className="loginsignup_message">
          <h1 className="login_or_signup animate__animated animate__fadeIn">
            login or signup...
          </h1>
        </div>
        <div className="loginsignup_auth animate__animated animate__fadeIn">
          <div>
            {/* <Link to="/takemeto"> */}
              <Button className="signup_button" onClick={signInWithGoogle}>
                <FontAwesomeIcon icon={faGoogle} /> Sign up with Google
              </Button>
            {/* </Link> */}
          </div>
          <div>
            {/* <Link to="/takemeto"> */}
              <Button className="login_button" onClick={signInWithGoogle}>
                <FontAwesomeIcon icon={faGoogle} /> Login with Google
              </Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
