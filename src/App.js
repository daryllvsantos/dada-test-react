import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RecipeDetails from "./component/Recipe/RecipeDetails";

function App() {
  return (
    <Router>
      <div className="App container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/recipe/:uuid">
            <RecipeDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
