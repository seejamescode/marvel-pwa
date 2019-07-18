import styled from "styled-components";

export default styled.a`
  background-size: cover;
  overflow: hidden;
  position: relative;

  :hover > * {
    opacity: 0.7;
  }

  :focus {
    outline: none;

    > * {
      opacity: 0.6;
    }
  }

  :active > * {
    opacity: 1;
  }
`;
