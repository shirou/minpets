import { useCallback, useRef, useState } from 'react'

import { search } from "@utils/search"

export const Search = () => {
    const [query, setQuery] = useState('')
    const [active, setActive] = useState(false)
    const [results, setResults] = useState([])
    const searchEndpoint = (query: string) => `/search.json?q=${query}`
  
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
      const onChange = useCallback(() => {
        const query = "A";
        setQuery(query)
        if (query.length) {
          const p = search()
          console.log(p);
        } else {
          setResults([])
        }
      }, [])


    return (<button onClick={onChange}>search</button>)
}