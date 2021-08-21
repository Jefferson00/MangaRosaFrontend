import styled, { css } from "styled-components";

import { Link } from "react-router-dom";

interface ValidateProps {
  isValidated: boolean;
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1.5rem;
`
export const Title = styled.h1`
  color: #DD1763;
`
export const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 0.5rem 0 1rem 0;
`
export const Input = styled.input`
  border: 1px solid #414141;
  border-radius: 10px;
  height: 2rem;
  padding: 1rem;
  margin: 0.5rem 0;
`


export const Main = styled.div`
  width: 45rem;
  max-width: 750px;
  margin: 0 auto;
`

export const RegisterContainer = styled.div`
  width: 100%;
  background-color: #EBEBEB;
  padding: 2rem;
  border-radius: 10px;
`

export const RegisterList = styled.div`
  display: flex;
  gap:1rem;
  flex-direction: column;
`

export const Register = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid #fff;
`

export const LinkComponent = styled(Link)`
  text-decoration: none;
  color: #414141;
`

export const Name = styled.p`
  font-weight: 500;
`

export const ValidateStatus = styled.span<ValidateProps>`
  color: #810303;
  ${(props) => props.isValidated &&
    css`
      color:#12b1b1;
    `
  }
`
