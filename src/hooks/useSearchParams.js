import * as React from 'react'
import { useLocation } from "@reach/router"
import { parse as parseQS } from "qs";

export const parseQueryString = string =>
  parseQS(string, { ignoreQueryPrefix: true, arrayFormat: 'brackets' });

const useSearchParams = () => {
  const location = useLocation();
  const [search, setSearch] = React.useState({})

  React.useEffect(() => {
    setSearch(parseQueryString(location.search || ""))
  }, [location.search])

  return search;
}

export default useSearchParams;
