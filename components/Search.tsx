import { useCallback, useRef, useState } from "react";

import { searchSnippet } from "@utils/search";
import { SearchInput } from "@patternfly/react-core";
import { useSearch } from "@utils/fetcher";

export const Search = () => {
  const { isLoading, isError } = useSearch();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);
  const searchEndpoint = (query: string) => `/search.json?q=${query}`;

  /*
    const onChange = useCallback(() => {
        const query = "A";
        setQuery(query)
        if (query.length) {
          fetch(searchEndpoint(query))
            .then(res => res.json())
            .then(res => {
              console.log(res)
              setResults(res)
            })
        } else {
          setResults([])
        }
      }, [])
      */
  const onChange = useCallback(
    (value, event) => {
      if (isLoading || isError) {
        return;
      }
      setQuery(value);
      if (value.length) {
        const p = searchSnippet(value);
        console.log(p);
      } else {
        setResults([]);
      }
    },
    [isLoading, isError]
  );

  return (
    <SearchInput
      id="search-input"
      placeholder="search"
      value={query}
      onChange={onChange}
      onClear={() => setQuery("")}
    ></SearchInput>
  );
};
