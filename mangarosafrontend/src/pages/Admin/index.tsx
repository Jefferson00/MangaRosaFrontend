import { FormEvent, useState } from "react";
import {
  Container,
  Header,
  Logo,
  Title,
  Main,
  Form,
  InputContainer,
  Input,
  Label,
  Button,
  ErrorMessage,
} from "./style";

import logoImg from '../../assets/logo.svg';
import getValidationErrors from "../../utils/getValidationErrors";

import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface LoginData {
  name: string;
  password: string;
}

interface Errors {
  [key: string]: string;
}

export function Login() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  const [errors, setErrors] = useState<Errors>({} as Errors);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setErrors({});

    const data: LoginData = {
      name,
      password
    }

    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Digite o nome para efetuar o login'),
        password: Yup.string()
          .required('Digite o nome para efetuar o login'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn(data);

      history.push('/registros');

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        alert('Preencha todos os campos corretamente.');

        const errors = getValidationErrors(error);
        setErrors(errors);
      } else {
        alert(error.response.data.error);
      }
    }
  }

  return (
    <Container>
      <Header>
        <Logo src={logoImg} />
        <Title>
          Login
        </Title>
      </Header>

      <Main>
        <Form onSubmit={handleLogin}>

          <InputContainer>
            <Label>Nome</Label>
            <Input
              type="text"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            {errors?.name &&
              <ErrorMessage>{errors.name}</ErrorMessage>
            }
          </InputContainer>

          <InputContainer>
            <Label>Senha</Label>
            <Input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            {errors?.password &&
              <ErrorMessage>{errors.password}</ErrorMessage>
            }
          </InputContainer>

          <Button type="submit">
            Entrar
          </Button>

        </Form>
      </Main>
    </Container>
  )
}