import App, { Container } from "next/app";
import Head from "next/head";
import styled, { createGlobalStyle } from "styled-components";
import Nav from "../components/Nav";
import { title } from "./_document";

// Any global CSS variables and selectors we want
const GlobalStyle = createGlobalStyle`
  :root {
    --padding: 2rem;
    --max-width: 50rem;
  }

  body {
    background: rgb(21,19,19);
    font-family: Roboto, sans-serif;
    margin: 0;

    * {
      color: white;
    }
  }

  a {
    text-decoration: none;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: var(--max-width);
`;

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <Container>
          <Nav />
          <Main>
            <Component {...pageProps} router={router} />
          </Main>
          <GlobalStyle />
        </Container>
      </>
    );
  }
}
