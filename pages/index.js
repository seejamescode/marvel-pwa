import React, { useCallback, useEffect, useRef, useState } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import getBaseURL from "../utils/get-base-url";
import Button from "../components/Button";
import Grid from "../components/Grid";
import HoverTile from "../components/HoverTile";
import Input from "../components/Input";
import Search from "../components/Search";
import Shield from "../components/Shield";
import Tile from "../components/Tile";
import useDebounce from "../components/useDebounce";

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
