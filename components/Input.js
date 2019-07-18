import styled from "styled-components";

export default styled.input`
  background: #cecece;
  border: none;
  border-radius: 2rem;
  box-sizing: border-box;
  color: black;
  font-size: 1rem;
  margin: auto;
  max-width: 30rem;
  padding: calc(var(--padding) / 2);
  position: relative;
  width: 100%;

  :hover {
    background: #e4e4e4;
  }

  :focus {
    background: #fff;
    outline: none;
  }
`;
