import { GlobalStyle } from './styles/global';

import { AuthProvider } from './contexts/AuthContext';
import Routes from './routes';

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Routes />
    </AuthProvider>
  );
}

export default App;
