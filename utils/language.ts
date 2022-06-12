// copied from highlight.js
const supportLanguages = new Set([
  "1c",
  "4d",
  "sap-abap",
  "abap",
  "abnf",
  "accesslog",
  "ada",
  "arduino",
  "ino",
  "armasm",
  "arm",
  "avrasm",
  "actionscript",
  "as",
  "alan",
  "i",
  "ln",
  "angelscript",
  "asc",
  "apache",
  "apacheconf",
  "applescript",
  "osascript",
  "arcade",
  "asciidoc",
  "adoc",
  "aspectj",
  "autohotkey",
  "autoit",
  "awk",
  "mawk",
  "nawk",
  "gawk",
  "bash",
  "sh",
  "zsh",
  "basic",
  "bbcode",
  "blade",
  "bnf",
  "brainfuck",
  "bf",
  "csharp",
  "cs",
  "c",
  "h",
  "cpp",
  "hpp",
  "cc",
  "hh",
  "c++",
  "h++",
  "cxx",
  "hxx",
  "cal",
  "cos",
  "cls",
  "cmake",
  "cmake.in",
  "coq",
  "csp",
  "css",
  "capnproto",
  "capnp",
  "chaos",
  "kaos",
  "chapel",
  "chpl",
  "cisco",
  "clojure",
  "clj",
  "coffeescript",
  "coffee",
  "cson",
  "iced",
  "cpc",
  "crmsh",
  "crm",
  "pcmk",
  "crystal",
  "cr",
  "curl",
  "cypher",
  "d",
  "dafny",
  "dart",
  "dpr",
  "dfm",
  "pas",
  "pascal",
  "diff",
  "patch",
  "django",
  "jinja",
  "dns",
  "zone",
  "bind",
  "dockerfile",
  "docker",
  "dos",
  "bat",
  "cmd",
  "dsconfig",
  "dts",
  "dust",
  "dst",
  "dylan",
  "ebnf",
  "elixir",
  "elm",
  "erlang",
  "erl",
  "excel",
  "xls",
  "xlsx",
  "extempore",
  "xtlang",
  "xtm",
  "fsharp",
  "fs",
  "fix",
  "fortran",
  "f90",
  "f95",
  "gcode",
  "nc",
  "gams",
  "gms",
  "gauss",
  "gss",
  "godot",
  "gdscript",
  "gherkin",
  "hbs",
  "glimmer",
  "html.hbs",
  "html.handlebars",
  "htmlbars",
  "gn",
  "gni",
  "go",
  "golang",
  "gf",
  "golo",
  "gololang",
  "gradle",
  "graphql",
  "groovy",
  "gsql",
  "xml",
  "html",
  "xhtml",
  "rss",
  "atom",
  "xjb",
  "xsd",
  "xsl",
  "plist",
  "svg",
  "http",
  "https",
  "haml",
  "handlebars",
  "hbs",
  "html.hbs",
  "html.handlebars",
  "haskell",
  "hs",
  "haxe",
  "hx",
  "hlsl",
  "hy",
  "hylang",
  "ini",
  "toml",
  "inform7",
  "i7",
  "irpf90",
  "json",
  "java",
  "jsp",
  "javascript",
  "js",
  "jsx",
  "jolie",
  "iol",
  "ol",
  "julia",
  "julia-repl",
  "kotlin",
  "kt",
  "tex",
  "leaf",
  "lean",
  "lasso",
  "ls",
  "lassoscript",
  "less",
  "ldif",
  "lisp",
  "livecodeserver",
  "livescript",
  "ls",
  "lua",
  "macaulay2",
  "makefile",
  "mk",
  "mak",
  "make",
  "markdown",
  "md",
  "mkdown",
  "mkd",
  "mathematica",
  "mma",
  "wl",
  "matlab",
  "maxima",
  "mel",
  "mercury",
  "mirc",
  "mrc",
  "mizar",
  "mkb",
  "mojolicious",
  "monkey",
  "moonscript",
  "moon",
  "n1ql",
  "nsis",
  "never",
  "nginx",
  "nginxconf",
  "nim",
  "nimrod",
  "nix",
  "ocl",
  "ocaml",
  "ml",
  "objectivec",
  "mm",
  "objc",
  "obj-c",
  "obj-c++",
  "objective-c++",
  "glsl",
  "openscad",
  "scad",
  "ruleslanguage",
  "oxygene",
  "pf",
  "pf.conf",
  "php",
  "papyrus",
  "psc",
  "parser3",
  "perl",
  "pl",
  "pm",
  "pine",
  "pinescript",
  "plaintext",
  "txt",
  "text",
  "pony",
  "pgsql",
  "postgres",
  "postgresql",
  "powershell",
  "ps",
  "ps1",
  "processing",
  "prolog",
  "properties",
  "protobuf",
  "puppet",
  "pp",
  "python",
  "py",
  "gyp",
  "profile",
  "python-repl",
  "pycon",
  "qsharp",
  "k",
  "kdb",
  "qml",
  "r",
  "cshtml",
  "razor",
  "razor-cshtml",
  "reasonml",
  "re",
  "redbol",
  "rebol",
  "red",
  "red-system",
  "rib",
  "rsl",
  "risc",
  "riscript",
  "graph",
  "instances",
  "robot",
  "rf",
  "rpm-specfile",
  "rpm",
  "spec",
  "rpm-spec",
  "specfile",
  "ruby",
  "rb",
  "gemspec",
  "podspec",
  "thor",
  "irb",
  "rust",
  "rs",
  "SAS",
  "sas",
  "scss",
  "sql",
  "p21",
  "step",
  "stp",
  "scala",
  "scheme",
  "scilab",
  "sci",
  "shexc",
  "shell",
  "console",
  "smali",
  "smalltalk",
  "st",
  "sml",
  "ml",
  "solidity",
  "sol",
  "spl",
  "stan",
  "stanfuncs",
  "stata",
  "iecst",
  "scl",
  "stl",
  "structured-text",
  "stylus",
  "styl",
  "subunit",
  "supercollider",
  "sc",
  "svelte",
  "swift",
  "tcl",
  "tk",
  "terraform",
  "tf",
  "hcl",
  "tap",
  "thrift",
  "tp",
  "tsql",
  "twig",
  "craftcms",
  "typescript",
  "ts",
  "unicorn-rails-log",
  "vbnet",
  "vb",
  "vba",
  "vbscript",
  "vbs",
  "vhdl",
  "vala",
  "verilog",
  "v",
  "vim",
  "xsharp",
  "xs",
  "prg",
  "axapta",
  "x++",
  "x86asm",
  "xl",
  "tao",
  "xquery",
  "xpath",
  "xq",
  "yml",
  "yaml",
  "zenscript",
  "zs",
  "zephir",
  "zep",
]);

export const getLanguage = (tags?: string[]): string | undefined => {
  if (!tags) { return undefined }
  return tags.find((tag) => supportLanguages.has(tag.toLowerCase()));
};
