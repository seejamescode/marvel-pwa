import styled from "styled-components";

export default styled.section`
  display: grid;
  grid-gap: var(--padding);
  margin: calc(2 * var(--padding)) auto;
  width: calc(100% - 2 * var(--padding));

  @media only screen and (min-width: 720px) {
    margin: calc(6 * var(--padding)) auto;
  }
`;
