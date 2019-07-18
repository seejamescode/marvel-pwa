import React, { useContext, useState } from "react";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import getBaseURL from "../../utils/get-base-url";

const Container = styled.div`
  padding: var(--padding);
`;

const Img = styled.img`
  max-width: 100%;
`;

const Character = ({
  comics: { items },
  description,
  name,
  thumbnail: { extension, path },
  urls
}) => (
  <Container>
    <h1>{name}</h1>
    {description && <p>{description.replace(/ï¿½/g, "’")}</p>}
    {!path.includes("image_not_available") && (
      <Img
        alt={name}
        src={`/api/image/${encodeURIComponent(`${path}.${extension}`)}`}
      />
    )}
    <h2>Comic appearences</h2>
    {items.length > 0 ? (
      items.map(({ name, resourceURI }) => <p key={resourceURI}>{name}</p>)
    ) : (
      <p>Unknown.</p>
    )}
    {urls && urls[0] && (
      <a href={urls[0].url} rel="noopener noreferrer" target="_blank">
        <p>More details</p>
      </a>
    )}
  </Container>
);

Character.getInitialProps = async ctx => {
  const baseUrl = getBaseURL(ctx);
  const characterFetch = await fetch(
    `${baseUrl}/api/character?id=${ctx.query.id}`
  );
  const character = await characterFetch.json();

  return character[0];
};

export default Character;
