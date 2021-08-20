import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Login } from "../pages/Admin";
import { Registers } from "../pages/Admin/Registers";
import { UserRegister } from "../pages/User/Register";

import PrivateRoute from "./PrivateRoute";

export default function Routes() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/:user/registrar" component={UserRegister} />
        <PrivateRoute path="/registros" component={Registers} />
      </Switch>
    </BrowserRouter>
  )
}