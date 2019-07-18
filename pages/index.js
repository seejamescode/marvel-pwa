import React, { useCallback, useEffect, useRef, useState } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import styled from "styled-components";
import getBaseURL from "../utils/get-base-url";
import useDebounce from "../components/useDebounce";

const Button = styled.button`
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

const Grid = styled.div`
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

const HoverTile = styled.div`
  background: black;
  box-sizing: border-box;
  height: 100%;
  left: 0;
  opacity: 0.8;
  padding: var(--padding);
  position: absolute;
  top: 0;
  width: 100%;
`;

const Input = styled.input`
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

const Search = styled.section`
  display: grid;
  grid-gap: var(--padding);
  margin: calc(6 * var(--padding)) auto;
  width: calc(100% - 2 * var(--padding));
`;

const Shield = styled.img`
  height: 10rem;
  margin: auto;
  width: 10rem;
`;

const Tile = styled.a`
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

const getCharacters = async ({ baseUrl = "", page = 1 }) => {
  const charactersFetch = await fetch(`${baseUrl}/api/characters?page=${page}`);
  const characters = await charactersFetch.json();

  return characters;
};

const getSearch = async ({ baseUrl = "", search = "" }) => {
  const charactersFetch = await fetch(`${baseUrl}/api/search?search=${search}`);
  const characters = await charactersFetch.json();

  return characters;
};

const Index = ({ initialCharacters }) => {
  const refMounted = useRef(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [characters, setCharacters] = useState(initialCharacters);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(2);

  const clearSearch = () => {
    setCharacters([]);
    setSearchTerm("");
    setPage(1);
    getMoreCharacters();
  };

  const getMoreCharacters = useCallback(async () => {
    setFetching(true);
    const newCharacters = await getCharacters({ page });
    setCharacters(
      page === 1 ? newCharacters : [...characters, ...newCharacters]
    );
    setFetching(false);
    setPage(page + 1);
  }, [page]);

  const searchCharacters = async () => {
    setFetching(true);
    setSearchTerm(debouncedSearchTerm);
    const newCharacters = await getSearch({ search: debouncedSearchTerm });
    setCharacters(newCharacters);
    setFetching(false);
    setPage(1);
  };

  useEffect(() => {
    if (refMounted.current) {
      if (debouncedSearchTerm) {
        searchCharacters({ debouncedSearchTerm });
      } else {
        clearSearch();
      }
    } else {
      refMounted.current = true;
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <style>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <Search>
        {fetching ? (
          <Shield
            alt="Captain America’s shield"
            src="/static/graphics/transparent.png"
            style={{
              animation: fetching && `rotate 500ms linear infinite`
            }}
          />
        ) : (
          <Shield
            alt="Captain America’s shield"
            src="/static/graphics/transparent.png"
          />
        )}
        <Input
          aria-label="Search characters"
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search characters"
          type="text"
          value={searchTerm}
        />
      </Search>
      <Grid>
        {characters.map(({ id, name, thumbnail: { extension, path } }) => (
          <Link
            as={`/character/${id}`}
            href={`/character/[id]`}
            key={id}
            passHref
          >
            <Tile
              aria-label={name}
              name={name}
              style={{
                backgroundImage:
                  !path.includes("image_not_available") &&
                  `url(/api/image/${encodeURIComponent(
                    `${path}.${extension})`
                  )}`
              }}
            >
              <HoverTile>{name}</HoverTile>
            </Tile>
          </Link>
        ))}
        {fetching ? (
          <>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </>
        ) : (
          <Button
            disabled={fetching}
            onClick={() =>
              debouncedSearchTerm !== "" ? clearSearch() : getMoreCharacters()
            }
          >
            {debouncedSearchTerm !== "" ? "Undo search" : "See more characters"}
          </Button>
        )}
      </Grid>
    </>
  );
};

Index.getInitialProps = async function(ctx) {
  const baseUrl = getBaseURL(ctx);
  const initialCharacters = await getCharacters({ baseUrl });

  return {
    initialCharacters
  };
};

export default Index;
