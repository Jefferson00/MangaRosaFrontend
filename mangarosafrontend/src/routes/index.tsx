import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Login } from "../pages/Admin";
import { Registers } from "../pages/Admin/Registers";
import { UserRegister } from "../pages/User/Register";
import PrivateRoute from "./PrivateRoute";

export default function Routes() {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/:user/registrar" component={UserRegister} />
        <PrivateRoute isAuth={isAuth()} path="/registros" component={Registers} />
      </Switch>
    </BrowserRouter>
  )
}