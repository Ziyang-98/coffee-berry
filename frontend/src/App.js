import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Market from "./Market/Market";
import PostingShowcase from "./Market/PostingShowcase/Posting";
import OrderForm from "./Orders/Form";
import Orders from "./Orders/Orders";
import PostingForm from "./Postings/Form";
import Postings from "./Postings/Postings";
import ManagePosting from "./Postings/ManagePosting/ManagePosting";
import Deleted from "./Postings/ManagePosting/Deleted";
import CreatePosting from "./CreatePosting/CreatePosting";
import Success from "./CreatePosting/Success";
import Footer from "./Footer/Footer";

const sections = [
  { title: "Home", url: "/" },
  { title: "Market", url: "/market" },
  { title: "Your Orders", url: "/orders" },
  { title: "Your Postings", url: "/postings" },
  { title: "Create Posting", url: "/create_posting" },
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
        <Route exact path="/" component={Home} />
        <Route exact path="/market" component={Market} />
        <Route exact path="/market/:postingId" component={PostingShowcase} />
        <Route exact path="/orders" component={OrderForm} />
        <Route path="/orders/:name" component={Orders} />
        <Route exact path="/postings" component={PostingForm} />
        <Route exact path="/postings/:name" component={Postings} />
        <Route
          exact
          path="/postings/:name/:postingId"
          component={ManagePosting}
        />
        <Route path="/postings/:name/:postingId/deleted" component={Deleted} />
        <Route exact path="/create_posting" component={CreatePosting} />
        <Route path="/create_posting/successful-upload" component={Success} />

        <Footer title="Coffeeberry" description="A project by Python Snakes" />
      </div>
    );
  }
}

export default withRouter(App);
