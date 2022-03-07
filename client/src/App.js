import "./styles/App.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PageHeader from "./components/PageHeader/PageHeader";
import PageFooter from "./components/PageFooter/PageFooter";
import Home from "./pages/Home/index";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <PageHeader />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
        <PageFooter />
      </div>
    </BrowserRouter>
  );
}
