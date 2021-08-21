import { Route, RouteProps, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface PrivateRouteProps extends RouteProps {
}

export default function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const { isAuth } = useAuth();

  if (!Component) return null;

  return (
    <Route
      {...rest}
      render={props =>
        isAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}