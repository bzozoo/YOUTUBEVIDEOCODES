import "./App.css";
import Header from "./component/header/Header";
import Home from "./component/home/Home";
import Products from "./component/products/Products";
import About from "./component/about/About";
import Contact from "./component/contact/Contact";
import { Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
      </Switch>
    </div>
  );
}
