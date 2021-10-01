import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import HomePage from "pages/Home";
import LoginPage from "pages/Login";
import SignupPage from "pages/Signup";
import ProfilePage from "pages/Profile";
import StorePage from "pages/Store";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/signup">
        <SignupPage />
      </Route>
      <Route exact path="/profile">
        <ProfilePage />
      </Route>
      <Route exact path="/store">
        <StorePage />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  </Router>
);

export default App;
