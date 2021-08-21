import { useHistory } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";

import {
  Container,
  Header,
  GoBack,
  GoBackIcon,
  Title,
  Main,
  ValidateContainer,
  UserDataContainer,
  Label,
  Data,
  KnowledgesContainer,
  ValidateButton,
} from "./style";

import GoBackImg from '../../../assets/goback.svg';

import api from "../../../services/api";

interface Knowledges {
  id: number;
  name: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  is_validated: boolean;
  knowledges: Knowledges[];
}

export function Validate() {
  const history = useHistory();
  const { user, handleSelectUser } = useUser();

  async function validateUser() {
    if (user) {
      try {
        const { data } = await api.put(
          `/users/validate/${user.id}`,
          { isValidate: !user.is_validated }
        );

        handleSelectUser(data);
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  }

  return (
    <Container>
      <Header>
        <GoBack onClick={history.goBack}>
          <GoBackIcon src={GoBackImg} />
        </GoBack>

        <Title>
          Validar colaborador
        </Title>
      </Header>

      <Main>
        <ValidateContainer>
          <UserDataContainer>
            <Label>Nome: </Label>
            <Data>{user?.name}</Data>
          </UserDataContainer>

          <UserDataContainer>
            <Label>Email: </Label>
            <Data>{user?.email}</Data>
          </UserDataContainer>

          <UserDataContainer>
            <Label>CPF: </Label>
            <Data>{user?.cpf}</Data>
          </UserDataContainer>

          <UserDataContainer>
            <Label>Celular: </Label>
            <Data>{user?.phone}</Data>
          </UserDataContainer>

          <UserDataContainer>
            <Label>Conhecimentos: </Label>
            <KnowledgesContainer>
              {user?.knowledges.map(knowledge => (
                <Data isKnowledge key={knowledge.id}>
                  {knowledge?.name}
                </Data>
              ))}
            </KnowledgesContainer>
          </UserDataContainer>

          <ValidateButton
            isValid={user?.is_validated || false}
            onClick={() => validateUser()}
          >
            {user?.is_validated ?
              "Não Validar" :
              "Validar"
            }
          </ValidateButton>
        </ValidateContainer>
      </Main>
    </Container>
  )
}