import { Document, Worker } from "flexsearch";
import { Snippet } from "./files";

export type indexFileType = { [key: string]: string };

const index = new Document({
  //  tokenize: "strict",
  //  optimize: true,
  //  resolution: 9,
  document: {
    id: "id",
    index: ["title", "description", "language"],
  },
});

export const addSnippet = (snippet: Snippet) => {
  const id = snippet.slug.join("/");

  index.add(id, snippet);
};

export const getSearchIndex = () => {
  return index;
};

export const importSearchIndex = (data: indexFileType) => {
  Object.keys(data).map((key) => {
    index.import(key, data[key]);
  });
};

export const searchSnippet = (text: string): Snippet[] => {
  const ret = index.search(text, 10);

  console.log(ret);

  return [];
};
