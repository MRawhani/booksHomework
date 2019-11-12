import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import 'react-toastify/dist/ReactToastify.min.css'
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Form";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <Switch>
        <Route path="/home/:id" component={Form} />
        <Route exact path="/home" component={Home} />
        <Route path="/notFound" component={NotFound} />
        <Redirect from="/" to="/home" />
        <Redirect to="/notFound" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
