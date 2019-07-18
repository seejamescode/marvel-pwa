import styled from "styled-components";

export default styled.button`
  && {
    background: rgba(21, 9, 107, 1);
    border: none;
    cursor: pointer;
    font-size: 1rem;
    grid-column: 1 / -1;

    :active {
      background: rgba(21, 9, 107, 0.4);
    }

    :hover {
      background: rgba(21, 9, 107, 0.2);
    }

    :focus {
      background: rgba(21, 9, 107, 0.3);
      outline: none;
    }
  }
`;
