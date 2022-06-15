import fs, { writeFileSync } from "fs";
import glob from "glob";
import { join } from "path";
import matter from "gray-matter";
import { TreeViewDataItem } from "@patternfly/react-core";
import { Document, Worker } from "flexsearch";

import { TreeFileName, IndexFileName } from "./constants";
import { getLanguage } from "@utils/language";
import { addSnippet, getSearchIndex } from "./search";

const config = require("../minpetsconfig.json");

const postDirPrefix = config["snippets_path"];
const postsDirectory = join(process.cwd(), postDirPrefix);

export type Snippet = {
  slug: string[];
  title: string;
  description: string;
  tags: string[];
  language: string;
  code: string; // snippet itself
  content: string; // all markdown content
};

const uniq = (src: string[]) => {
  return src.filter((elem, index, self) => self.indexOf(elem) === index);
};

const getTags = (
  t: string[] | string | undefined,
  tagsFromSlugs: string[]
): string[] => {
  if (!t) {
    return uniq(tagsFromSlugs);
  }
  if (typeof t === "string") {
    return uniq(t.split(",").concat(tagsFromSlugs));
  }

  return uniq(t.concat(tagsFromSlugs));
};

export const getSnippetsBySlug = (slugArray: string[]): Snippet => {
  const matchedSlug = slugArray.join("/");
  const realSlug = matchedSlug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const tagsFromSlugs = slugArray.slice(0, -1);
  const tags = getTags(data["tags"], tagsFromSlugs);
  const lang = data["language"] ? data["language"] : getLanguage(tags);

  return {
    slug: slugArray,
    title: data["title"] || slugArray[slugArray.length - 1],
    description: data["description"] || "",
    content: content,
    code: content,
    language: lang,
    tags: tags,
  };
};

const createParent = (
  node: TreeViewDataItem,
  paths: string[]
): TreeViewDataItem => {
  if (!node.children) {
    node.children = [];
  }
  if (paths.length === 0) {
    return node;
  }

  const dirname = paths[0];
  const found = node.children.find((item) => item.id == dirname);
  if (found) {
    return createParent(found, paths.slice(1));
  }
  const next = {
    id: dirname,
    name: dirname,
  };
  node.children.push(next);
  return createParent(next, paths.slice(1));
};

// getFileTree get file tree which will be used on sidebar from glob list
export const getFileTree = (paths: string[][]): TreeViewDataItem[] => {
  const root = {
    name: "root",
    children: [],
  } as TreeViewDataItem;

  paths.forEach((path) => {
    const m = path.length;
    const id = path.join("/");
    const parent = createParent(root, path.slice(0, -1));
    const leaf = {
      id: id,
      name: path[m - 1],
    };
    parent.children!.push(leaf);
  });
  return root.children!;
};

const exportAsync = (docIndex: Document<unknown, false>) =>
  new Promise((resolve, reject) => {
    try {
      const e = new Map<string | number, any>();
      return docIndex.export(async (key, data) => {
        try {
          e.set(key, data);
          if (key === "store") {
            resolve(e); // store is the last to go, but this relies on internals and assumes no error occurs in the process :(
          }
        } catch (err) {
          reject(err);
        }
      });
    } catch (err) {
      reject(err);
    }
  });

const exportSearchIndex = async () => {
  const index = getSearchIndex();
  const e = (await exportAsync(index)) as Map<string | number, any>;

  writeFileSync(
    join(process.cwd(), "public", IndexFileName),
    JSON.stringify({ ...Object.fromEntries(e) })
  );
};

export const getAllSnippets = () => {
  const entries = glob.sync(`${postDirPrefix}/**/*.md`);

  const paths = entries
    .map((file) => file.split(postDirPrefix).pop())
    .map((slug) =>
      (slug as string)
        .replace(/\.md$/, "")
        .split("/")
        .filter((s: string) => s !== "")
    );

  paths.forEach((slug) => {
    const snippet = getSnippetsBySlug(slug);
    addSnippet(snippet);
  });
  exportSearchIndex();

  const tree = getFileTree(paths);
  // "tree.json" will be used by sidebar
  writeFileSync(
    join(process.cwd(), "public", TreeFileName),
    JSON.stringify(tree)
  );

  return {
    paths: paths,
  };
};
