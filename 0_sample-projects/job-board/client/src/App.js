import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { logout } from "./components/auth";
import { CompanyDetail } from "./components/CompanyDetail";
import { JobBoard } from "./components/JobBoard";
import { JobDetail } from "./components/JobDetail";
import { JobForm } from "./components/JobForm";
import { LoginForm } from "./components/LoginForm";
import { NavBar } from "./components/NavBar";

export const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  let history = useHistory();

  const handleLogin = () => {
    setLoggedIn(true);
    history.push("/");
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    history.push("/");
  };

  return (
    <>
      <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
      <section className="section">
        <div className="container">
          <Switch>
            <Route exact path="/" component={JobBoard} />
            <Route path="/companies/:companyId" component={CompanyDetail} />
            <Route exact path="/jobs/new" component={JobForm} />
            <Route path="/jobs/:jobId" component={JobDetail} />
            <Route exact path="/login">
              <LoginForm onLogin={handleLogin} />
            </Route>
          </Switch>
        </div>
      </section>
    </>
  );
};
