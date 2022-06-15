import useSWRImmutable from "swr/immutable";

import { TreeFileName, IndexFileName } from "./constants";
import { join } from "path";
import { importSearchIndex, indexFileType } from "./search";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useTree = () => {
  const { data, error } = useSWRImmutable(join("/", TreeFileName), fetcher);

  return {
    tree: data,
    isLoading: !error && !data,
    isError: error,
  };
};

let imported = false;

export const useSearch = () => {
  const { data, error } = useSWRImmutable(join("/", IndexFileName), fetcher);

  if (data && !imported) {
    importSearchIndex(data as indexFileType);
    imported = true;
  }

  return {
    isLoading: !error && !data,
    isError: error,
  };
};
