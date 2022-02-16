import React, { useState } from "react";
import { login } from "./auth";

export const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    login(email, password).then((ok) => {
      if (ok) {
        props.onLogin();
      } else {
        setError(true);
      }
    });
  };

  return (
    <form>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="email"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
      </div>
      <div className="field">
        <p className="help is-danger">{error && "Invalid credentials"}</p>
        <div className="control">
          <button className="button is-link" onClick={handleClick}>
            Login
          </button>
        </div>
      </div>
    </form>
  );
};
