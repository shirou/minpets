const supportLanguages = new Set(["python", "go", "typescript", "javascript"]);

export const getLanguage = (tags: string[]): string | undefined => {
  return tags.find((tag) => supportLanguages.has(tag.toLowerCase()));
};
