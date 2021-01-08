import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home/Home";
import Footer from "./Footer";

// function App() {
//   return (
//     <div className="App">
//       <Route exact path="/" component={Home} />
//     </div>
//   );
// }

// export default withRouter(App);
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
