import fs from "fs";
import glob from "glob";
import { join } from "path";
import matter from "gray-matter";
import { time } from "console";

const config = require('../minpetsconfig.json');

const postDirPrefix = config["snippets_path"];
const postsDirectory = join(process.cwd(), postDirPrefix);

export const getSnippetsBySlug = (
  slugArray: string[],
  fields: string[] = []
) => {
  const matchedSlug = slugArray.join("/");
  const realSlug = matchedSlug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string | string[];
  };

  const items: Items = {};

  console.log({ fileContents })
  console.log({ data })

  fields.forEach((field) => {
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
};

export const writeFileTree = (paths: string[][]) => {

  return paths.map((path) => {



  }).flat();
}


export const getAllSnippets = () => {
  const entries = glob.sync(`${postDirPrefix}/**/*.md`);


  const paths = entries
    .map((file) => file.split(postDirPrefix).pop())
    .map((slug) => (slug as string).replace(/\.md$/, "").split("/").filter((s: string) => s !== ""));

  return paths;
};
