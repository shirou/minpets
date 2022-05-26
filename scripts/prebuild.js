#!/usr/bin/env node

const fs = require("fs");
const glob = require("glob");
const path = require("path"); // path.join
const matter = require("gray-matter");

const postDirPrefix = "../public_snippets/snippets/";

const entries = glob.sync(`${postDirPrefix}/**/*.md`);
const e = entries
  .map((file) => file.split(postDirPrefix).pop())
  .map((slug) => slug.replace(/\.md$/, "").split("/"));

console.log(e);

fs.writeFile(`./public/search.json`, JSON.stringify(e), function (err) {
  if (err) {
    throw err;
  }
});
