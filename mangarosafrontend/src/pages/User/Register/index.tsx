import { FormEvent } from "react";
import {
  Container,
  Header,
  Logo,
  Title,
  Main,
  Form,
  Label,
  Input,
  Button,
  ErrorMessage,
  InputContainer,
  InputMasked,
  CheckBoxLabel,
  CheckBoxContainer,
  CheckBoxItem,
} from "./style";

import logoImg from '../../../assets/logo.png';

import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useState } from "react";
import getValidationErrors from "../../../utils/getValidationErrors";

interface RegisterData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  knowledges: string[];
}

interface Errors {
  [key: string]: string;
}

export function UserRegister() {
  const { user } = useParams<{ user: string }>();

  const knowledges = ['Git', 'React', 'PHP', 'NodeJS', 'DevOps', 'Banco de Dados', 'Typescript'];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [userKnowledges, setUserKnowledges] = useState<string[]>([]);

  const [errors, setErrors] = useState<Errors>({} as Errors);

  /*
   *  Update state for array of user knowledges
   */
  function handleSetKnowledges(value: string) {
    if (userKnowledges.includes(value)) {
      setUserKnowledges(
        userKnowledges.filter(knowledge => knowledge !== value)
      );
    } else {
      setUserKnowledges([...userKnowledges, value]);
    }
  }

  /*
   *  Validate data and try register user 
   */
  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    setErrors({});

    const data: RegisterData = {
      name,
      email,
      cpf,
      phone,
      knowledges: userKnowledges,
    }

    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Nome é obrigatório!')
          .max(100),
        email: Yup.string()
          .required('E-mail obrigatório!')
          .email('Digite um e-mail válido').max(100),
        cpf: Yup.string()
          .required('Cpf obrigatório!')
          .max(14, 'O CPF deverá seguir o padrão 000.000.000-00'),
        knowledges: Yup.array()
          .min(1, 'Escolha no mínimo um conhecimento')
          .max(3, 'Escolha no máximo 3 conhecimentos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        alert('Preencha todos os campos corretamente.');

        const errors = getValidationErrors(error);
        setErrors(errors);
      }
    }
  }

  return (
    <Container>
      <Header>
        <Logo src={logoImg} />
        <Title>
          Bem vindo {user}! Faça seu registro abaixo:
        </Title>
      </Header>

      <Main>
        <Form onSubmit={handleRegister}>
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
            <Label>Email</Label>
            <Input
              type="text"
              placeholder="user@email.com"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            {errors?.email &&
              <ErrorMessage>{errors.email}</ErrorMessage>
            }
          </InputContainer>

          <InputContainer>
            <Label>CPF</Label>
            <Input
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={event => setCpf(event.target.value)}
            />
            {errors?.cpf &&
              <ErrorMessage>{errors.cpf}</ErrorMessage>
            }
          </InputContainer>

          <InputContainer>
            <Label>Celular</Label>
            <InputMasked
              mask="(99) 99999-9999"
              type="text"
              placeholder="(xx) xxxxx-xxxx"
              value={phone}
              onChange={event => setPhone(event.target.value)}
            />
            {errors?.phone &&
              <ErrorMessage>{errors.phone}</ErrorMessage>
            }
          </InputContainer>

          <InputContainer>
            <Label>Conhecimentos</Label>
            <CheckBoxContainer>
              {knowledges.map((knowledge, index) => {
                return (
                  <CheckBoxItem key={index}>
                    <Input
                      type="checkbox"
                      value={knowledge}
                      onChange={event => handleSetKnowledges(event.target.value)}
                    />
                    <CheckBoxLabel>{knowledge}</CheckBoxLabel>
                  </CheckBoxItem>
                )
              })}
            </CheckBoxContainer>
            {errors?.knowledges &&
              <ErrorMessage>{errors.knowledges}</ErrorMessage>
            }
          </InputContainer>

          <Button type="submit">
            Registrar
          </Button>
        </Form>
      </Main>
    </Container>
  )
}