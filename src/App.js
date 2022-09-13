import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks";
import theme from "./theme"
import { ThemeProvider} from '@mui/material/styles';
import React from "react";
export const config = {
  endpoint: `https://rahul-qkart-frontend.herokuapp.com/api/v1`,
};

function App() {
  return (
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
          
          {/* <Login/> */}
          <React.StrictMode>
       <ThemeProvider theme={theme}>
       <Switch>
        <Route exact path="/">
          <Products />
        </Route>

        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route exact path="/thanks">
          <Thanks />
        </Route>

        <Route exact path="/products">
          <Products />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
       </ThemeProvider>
    </React.StrictMode>
    </div>
  );
}

export default App;
