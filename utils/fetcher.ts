import useSWR from "swr";

import { TreeFileName } from "./constants";
import { join } from "path";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useTree = () => {
  const { data, error } = useSWR(join("/", TreeFileName), fetcher);

  return {
    tree: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSource = (path: string) => {
  const { data, error } = useSWR(join("/", path), fetcher);

  return {
    tree: data,
    isLoading: !error && !data,
    isError: error,
  };
};
