import React, { useState } from "react";
import bg1 from "../images/log.svg";
import bg2 from "../images/register.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { signin, signup } from "../redux/actions/auth";

const Form = () => {
  const [signUpMode, setSignUpMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = { email, password };
      console.log(user);
      await dispatch(signin(user));
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!handelPasswordValidation(password)) {
      return;
    }
    setLoading(true);
    try {
      const newUser = { name, email, password };
      console.log(newUser);
      await dispatch(signup(newUser));
      navigate("/auth");
    } catch (error) {
      console.error("Sign-up error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handelPasswordValidation = (pass) => {
    if (pass.trim() == "") {
      toast.error("Please enter the password");
      return false;
    }
    if (pass.length < 6) {
      toast.error("Please enter atleast 6 char ");
      return false;
    }
    const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/;
    if (!specialChar.test(pass)) {
      toast.error("Please enter a special character");
      return false;
    }

    return true;
  };
  return (
    <div className={`container ${signUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSignIn} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn solid" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <form onSubmit={handleSignUp} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>
              "Unlock a world of possibilities – Sign in to your account and get
              started!"
            </p>
            <button
              className="btn transparent"
              onClick={() => setSignUpMode(true)}
            >
              Sign up
            </button>
          </div>
          <img src={bg1} className="image" alt="Sign in illustration" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>
              "Join us today – Sign up and start your journey with endless
              opportunities!"
            </p>
            <button
              className="btn transparent"
              onClick={() => setSignUpMode(false)}
            >
              Sign in
            </button>
          </div>
          <img src={bg2} className="image" alt="Sign up illustration" />
        </div>
      </div>
    </div>
  );
};

export default Form;
