import Link from "next/link";
import styled from "styled-components";
import { title } from "../pages/_document";

const Content = styled.nav`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: var(--max-width);
  padding: var(--padding);
`;

const Credits = styled.a`
  margin: 0;
`;

const H1 = styled.h1`
  font-size: 1rem;
  margin: 0;
`;

const Nav = () => (
  <Content>
    <Link as={`/`} href={`/`}>
      <H1>
        <a href="/">{title}</a>
      </H1>
    </Link>
    <Credits
      href="https://github.com/seejamescode/marvel-pwa"
      rel="noopener noreferrer"
      target="_blank"
    >
      Source code
    </Credits>
  </Content>
);

export default Nav;
