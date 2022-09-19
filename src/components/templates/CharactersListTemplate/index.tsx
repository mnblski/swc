import NextLink from "next/link";
import { useState } from "react";
import styles from "./CharactersListTemplate.module.scss";

interface CharactersListTemplateProps {
  characters: Character[];
  pagesCount: number;
  pageCurrent: number | null;
}

const CharactersListTemplate: React.FC<CharactersListTemplateProps> = ({
  characters,
  pagesCount,
  pageCurrent,
}) => {
  const [sorting, setSorting] = useState<
    "mass-asc" | "mass-desc" | "name-az" | "name-za"
  >();

  const getPageNumber = (position: "current" | "prev" | "next") => {
    if (!pageCurrent) return;

    switch (position) {
      case "current":
        return pageCurrent;
      case "prev":
        return pageCurrent - 1;
      case "next":
        return pageCurrent + 1;
    }
  };

  const sortedData = (data: Character[]) => {
    const dataFormatted = data?.map((character) => ({
      ...character,
      mass: character.mass.replace(/,/g, "."),
    }));

    switch (sorting) {
      case "mass-desc":
      case "mass-asc":
        return dataFormatted?.sort((a, b) => {
          if (a.mass === b.mass) {
            return 0;
          }

          if (isNaN(+a.mass)) {
            return 1;
          }

          if (isNaN(+b.mass)) {
            return -1;
          }

          if (sorting === "mass-desc") {
            return +a.mass < +b.mass ? 1 : -1;
          }

          return +a.mass < +b.mass ? -1 : 1;
        });

      default:
        return data;
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>List of Characters</h1>
        </div>
        <div className={styles.actions}>
          <span>Sort by mass:</span>
          <button
            type="button"
            aria-label="Sort Characters by mass in ascending order"
            onClick={() => setSorting("mass-asc")}
            data-is-active={sorting === "mass-asc"}
          >
            +
          </button>
          <button
            type="button"
            aria-label="Sort Characters by mass in ascending order"
            onClick={() => setSorting("mass-desc")}
            data-is-active={sorting === "mass-desc"}
          >
            -
          </button>
        </div>
      </div>
      <div>
        <ul className={styles.charactersList}>
          {sortedData(characters)?.map((character: Character, index) => (
            <li className={styles.characterCard} key={index}>
              <div>
                <span>{character.name}</span>
                <span>Mass: {character.mass}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.pageNavigation}>
          <NextLink href={`/characters/${getPageNumber("prev")}`}>
            <button
              type="button"
              aria-label="Navigate to Next Page"
              disabled={!pageCurrent || pageCurrent === 1}
              className={styles.paginationButton}
            >
              Previous
            </button>
          </NextLink>
          <div className={styles.currentPage}>
            <span>
              {getPageNumber("current")} / {pagesCount}
            </span>
          </div>
          <NextLink href={`/characters/${getPageNumber("next")}`}>
            <button
              type="button"
              aria-label="Navigate to Next Page"
              disabled={!pageCurrent || pageCurrent === pagesCount}
              className={styles.paginationButton}
            >
              Next
            </button>
          </NextLink>
        </div>
      </div>
    </div>
  );
};

export default CharactersListTemplate;
