import "./styles/App.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PageHeader from "./components/PageHeader/PageHeader";
// import PageFooter from "./components/PageFooter/PageFooter";
import Home from "./pages/Home/index";
import { useState } from "react";

export default function App() {
  const [address, setAddress] = useState("");
  return (
    <BrowserRouter>
      <div className={`App ${address ? "address-linked" : ""}`}>
        <PageHeader />
        <Switch>
          <Route
            path="/"
            exact
            component={() => <Home address={address} setAddress={setAddress} />}
          />
        </Switch>
        {/* <PageFooter /> */}
      </div>
    </BrowserRouter>
  );
}
