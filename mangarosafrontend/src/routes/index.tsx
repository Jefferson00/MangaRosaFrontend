import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Login } from "../pages/Admin";
import { Registers } from "../pages/Admin/Registers";
import { Validate } from "../pages/Admin/Validate";
import { UserRegister } from "../pages/User/Register";

import PrivateRoute from "./PrivateRoute";

export default function Routes() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/:user/registrar" component={UserRegister} />
        <PrivateRoute path="/registros" component={Registers} />
        <PrivateRoute path="/:user/validar" component={Validate} />
      </Switch>
    </BrowserRouter>
  )
}