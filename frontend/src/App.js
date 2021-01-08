import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Footer from "./Footer/Footer";

const sections = [
  { title: "Home", url: "#" },
  { title: "Market", url: "#" },
  { title: "Your Orders", url: "#" },
  { title: "Your Postings", url: "#" },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoute: "/",
    };
  }

  render() {
    return (
      <div>
        <Header title="Coffeeberry" sections={sections} />
        <Route path="/" component={Home} />
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </div>
    );
  }
}

export default withRouter(App);
