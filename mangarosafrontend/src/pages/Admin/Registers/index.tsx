import { useState } from "react";

import {
  Container,
  Header,
  Title,
  Main,
  RegisterContainer,
  RegisterList,
  Register,
  Name,
  ValidateStatus,
  Input,
  SearchContainer,
  LinkComponent
} from "./style";

import api from "../../../services/api";
import { useEffect } from "react";
import { useUser } from "../../../contexts/UserContext";

interface UsersProps {
  id: number;
  name: string;
  is_validated: boolean;
}

export function Registers() {
  const { getUser } = useUser();
  const [token, setToken] = useState<string | null>(null);
  //const history = useHistory();
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [searchValue, setSearchValue] = useState('');

  async function getAllUsers() {
    if (token) {
      try {
        const { data } = await api.get('/users');
        setUsers(data);
        console.log(data)
      } catch (error) {
        alert('Não foi possível carregar os colaboradores')
      }
    }
  }

  async function searchInUser() {
    try {
      let search = {
        searchValue,
      }

      const { data } = await api.post('/users/search', search);

      setUsers(data)

    } catch (error) {

    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      searchInUser()
    }, 100);
    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    const storedToken = localStorage.getItem('@MangaRosa:token');

    if (storedToken) {
      api.defaults.headers.authorization = `Bearer ${storedToken}`;
      setToken(storedToken);
    } else {
      api.defaults.headers.authorization = null;
      setToken(null);
    }

    getAllUsers();
  }, [token]);

  return (
    <Container>
      <Header>
        <Title>
          Colaboradores registrados
        </Title>

        <SearchContainer>
          <p>Procurar</p>
          <Input
            type="text"
            value={searchValue}
            onChange={event => setSearchValue(event.target.value)}
          />
        </SearchContainer>
      </Header>

      <Main>
        <RegisterContainer>
          <RegisterList>
            {users.map(user => (
              <Register key={user.id}>
                <LinkComponent to={`${user.name}/validar`} onClick={() => getUser(user.id)}>
                  <Name>{user.name}</Name>
                </LinkComponent>
                <ValidateStatus isValidated={user.is_validated}>
                  {user.is_validated ?
                    'Validado' :
                    'Não validado'
                  }
                </ValidateStatus>
              </Register>
            ))}
          </RegisterList>
        </RegisterContainer>
      </Main>
    </Container>
  )
}