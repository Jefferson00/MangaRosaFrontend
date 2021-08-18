import { GlobalStyle } from './styles/global';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserRegister } from './pages/User/Register'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/:user/registrar" component={UserRegister} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
