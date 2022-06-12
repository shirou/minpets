import fs, { writeFileSync } from "fs";
import glob from "glob";
import { join } from "path";
import matter from "gray-matter";
import { TreeViewDataItem } from "@patternfly/react-core";

import { TreeFileName } from "./constants";
import { getLanguage } from "@utils/language";

const config = require("../minpetsconfig.json");

const postDirPrefix = config["snippets_path"];
const postsDirectory = join(process.cwd(), postDirPrefix);

export type Snippet = {
  slug: string[];
  title: string;
  tags: string[];
  language: string;
  content: string; // all markdown content
  code: string; // snippet itself
};

const uniq = (src: string[]) => {
  return src.filter((elem, index, self) => self.indexOf(elem) === index);
}

const getTags = (t: string[] | string | undefined, tagsFromSlugs: string[]): string[] => {
  if (!t) {
    return uniq(tagsFromSlugs);
  }
  if (typeof (t) === "string") {
    return uniq(t.split(",").concat(tagsFromSlugs))
  }

  return uniq(t.concat(tagsFromSlugs))
};


/**
 * find a first code block if markdown. if not a markdown, return whole content
 * 
 * @param content markdown or just a string
 * @returns code 
 */
export const getCode = (content: string): string => {

  return content;
}

export const getSnippetsBySlug = (slugArray: string[]): Snippet => {
  const matchedSlug = slugArray.join("/");
  const realSlug = matchedSlug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const tagsFromSlugs = slugArray.slice(0, -1);

  const tags = getTags(data["tags"], tagsFromSlugs);

  if (!data["language"]) {
    data["language"] = getLanguage(tags) || "";
  }
  return {
    slug: slugArray,
    title: data["title"] || "",
    content: content,
    code: getCode(content),
    language: data["language"],
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
