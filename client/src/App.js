import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home"
import DogDetails from "./components/DogDetails/DogDetails";
import FormAddDog from "./components/FormAddDog/FormAddDog";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/dog-detail/:id">
            <DogDetails />
          </Route>
          <Route exact path="/dog">
            <FormAddDog />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
