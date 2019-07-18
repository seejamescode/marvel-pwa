import styled from "styled-components";

export default styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  grid-gap: 1px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(calc(6 * var(--padding)), 1fr)
  );

  :before {
    content: "";
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  > * {
    background: #8181d8;

    :first-child {
      grid-row: 1 / 1;
      grid-column: 1 / 1;
    }
  }
`;
