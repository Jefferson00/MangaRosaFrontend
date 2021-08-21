import { FormEvent, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
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
  Subtitle,
} from "./style";

import logoImg from '../../../assets/logo.svg';

import * as Yup from 'yup';

import getValidationErrors from "../../../utils/getValidationErrors";

import api from "../../../services/api";

interface Knowledges {
  id: number;
  name: string;
}

interface RegisterData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  knowledges: Knowledges[];
}

interface Errors {
  [key: string]: string;
}

export function UserRegister() {
  const { user } = useParams<{ user: string }>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [knowledges, setKnowledges] = useState<Knowledges[]>([]);
  const [userKnowledges, setUserKnowledges] = useState<Knowledges[]>([]);

  const [errors, setErrors] = useState<Errors>({} as Errors);

  /**
   * Set the knowledges state with database results
   */
  async function getAllKnowledges() {
    try {
      const { data } = await api.get('/knowledges');

      let knowledgesArray: Knowledges[] = [];

      data.map((knowledge: Knowledges) => {
        knowledgesArray.push({
          id: knowledge.id,
          name: knowledge.name,
        })
      });

      setKnowledges(knowledgesArray);
    } catch (error) {
      alert('Não foi possível carregar os conhecimentos')
    }
  }

  /*
   *  Update state for array of user knowledges
   */
  function handleSetKnowledges(value: string) {
    const includeValue = userKnowledges.filter(knowledge => knowledge.name === value);

    const knowledgesFiltered = knowledges.filter(knowledge => knowledge.name === value);

    if (includeValue.length > 0) {
      setUserKnowledges(
        userKnowledges.filter(knowledge => knowledge.name !== value)
      );
    } else {
      setUserKnowledges([...userKnowledges, knowledgesFiltered[0]]);
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

      const response = await api.post('/users/create', data);

      if (response.data) {
        alert('Registrado com sucesso!');
      }
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

  useEffect(() => {
    getAllKnowledges();
  }, []);

  return (
    <Container>
      <Header>
        <div>
          <Logo src={logoImg} />
        </div>
        <div>
          <Title>
            Bem vindo {user}!
          </Title>
          <Subtitle>Faça seu registro abaixo:</Subtitle>
        </div>
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
            <InputMasked
              mask="999.999.999-99"
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
              {knowledges && knowledges.map((knowledge) => {
                return (
                  <CheckBoxItem key={knowledge.id}>
                    <Input
                      type="checkbox"
                      value={knowledge.name}
                      onChange={event => handleSetKnowledges(event.target.value)}
                    />
                    <CheckBoxLabel>{knowledge.name}</CheckBoxLabel>
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