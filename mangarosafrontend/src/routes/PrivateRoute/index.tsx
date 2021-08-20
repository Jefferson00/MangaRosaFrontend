import { Route, RouteProps, Redirect } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  isAuth: boolean;
}

export default function PrivateRoute({ component: Component, isAuth, ...rest }: PrivateRouteProps) {
  if (!Component) return null;

  console.log(isAuth)
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}