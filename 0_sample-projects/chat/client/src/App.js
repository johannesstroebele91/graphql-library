import { ApolloProvider } from "@apollo/react-hooks";
import React, { Component } from "react";
import { getLoggedInUser, logout } from "./auth";
import Chat from "./Chat";
import client from "./graphql/client";
import Login from "./Login";
import NavBar from "./NavBar";

class App extends Component {
  state = { user: getLoggedInUser() };

  handleLogin(user) {
    this.setState({ user });
  }

  handleLogout() {
    logout();
    this.setState({ user: null });
  }

  render() {
    const { user } = this.state;
    if (!user) {
      return <Login onLogin={this.handleLogin.bind(this)} />;
    }
    return (
      <ApolloProvider client={client}>
        <NavBar onLogout={this.handleLogout.bind(this)} />
        <Chat user={user} />
      </ApolloProvider>
    );
  }
}

export default App;
