import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1.5rem;
`
export const Logo = styled.img`
  max-height: 100%;
  width: 15rem;
`
export const Title = styled.h1`
  color: #DD1763;
`
export const Main = styled.div`
  width: 35rem;
  max-width: 750px;
  margin: 0 auto;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
`
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 1rem 0;
`
export const Label = styled.label`
  font-weight: 500;
`
export const Input = styled.input`
  border: 1px solid #414141;
  border-radius: 10px;
  height: 2rem;
  padding: 1rem;
  margin: 0.5rem 0;
`
export const Button = styled.button`
  height: 3rem;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  background-color: #12b1b1;
  color: #fff;
  font-weight: 500;
  transition: background-color 0.4s;

  &:hover{
    background-color: #129595;
  }
`
export const ErrorMessage = styled.span`
  font-size: 0.8rem;
  color:#F43434;
`