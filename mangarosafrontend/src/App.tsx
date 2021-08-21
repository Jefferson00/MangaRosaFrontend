import { GlobalStyle } from './styles/global';

import { AuthProvider } from './contexts/AuthContext';
import Routes from './routes';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <GlobalStyle />
        <Routes />
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
