import styled, { css } from "styled-components";

interface DataProps {
  isKnowledge?: boolean;
}

interface ButtonProps {
  isValid: boolean;
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`
export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  padding: 2rem;
  gap: 1.5rem;
`
export const Title = styled.h1`
  
`
export const GoBack = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  margin-right: 1rem;
`
export const GoBackIcon = styled.img`

`

export const Main = styled.div`
  width: 45rem;
  max-width: 750px;
  margin: 0 auto;
`
export const ValidateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #EBEBEB;
  padding: 2rem;
  border-radius: 10px;
`
export const UserDataContainer = styled.div`  
  width: 100%;
  background-color: #D6D6D6;
  border-radius: 10px;
  padding: 1rem;
  margin-top: 1rem;
`
export const KnowledgesContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`
export const Label = styled.label`
  font-weight: 500;
  margin-right: 0.5rem;
`
export const Data = styled.span<DataProps>`
  color: #383833;

  ${(props) => props.isKnowledge &&
    css`
      color:#006BE9;
      font-weight: 500;
    `
  }
`

export const ValidateButton = styled.button<ButtonProps>`
  cursor: pointer;
  height: 3rem;
  width: 8rem;
  margin-top: 2rem;
  border-radius: 10px;
  border: 1px solid #fff;
  font-weight: 500;
  transition: all 0.4s;
  color:#fff;
  background-color: #12b1b1;
  border: 1px solid #139295;

  &:hover{
    background-color: #139295;
    border: 1px solid #139295;
  }

  ${(props) => props.isValid &&
    css`
      color:#fff;
      background-color: #f43434;
      border: 1px solid #810303;

      &:hover{
        background-color: #810303;
        border: 1px solid #810303;
      }
    `
  }

`