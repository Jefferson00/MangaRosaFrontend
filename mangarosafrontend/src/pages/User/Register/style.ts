import styled from "styled-components";
import InputMask from 'react-input-mask';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`
export const Header = styled.div`
  display: flex;
  width: 37rem;
  max-width: 750px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  gap: 1.5rem;
`
export const Logo = styled.img`
  max-height: 100%;
  width: 10rem;
`
export const Title = styled.h2`
  color: #DD1763;
`
export const Subtitle = styled.p`
  color:#414141;
  font-size: 1.25rem;
`
export const Main = styled.div`
  width: 37rem;
  max-width: 750px;
  margin: 0 auto;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
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
export const CheckBoxContainer = styled.div`
    display: flex;
    align-items: center;
    gap:1rem;
`
export const CheckBoxItem = styled.div`
    display: flex;
    justify-content:center;
    text-align: center;
    gap:0.5rem;
    align-items: center;
`
export const CheckBoxLabel = styled.label`
  font-weight: 500;
  font-size: 0.8rem;
`
export const Input = styled.input`
  border: 1px solid #414141;
  border-radius: 10px;
  height: 2rem;
  padding: 1rem;
  margin: 0.5rem 0;
`
export const InputMasked = styled(InputMask)`
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

