// scripts/validate-css-grammar.mjs
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import * as csstree from "css-tree"; // <- fix: no default export

const BUILD_DIR = "build";

async function* walk(dir) {
  for (const dirent of await readdir(dir, { withFileTypes: true })) {
    const res = join(dir, dirent.name);
    if (dirent.isDirectory()) yield* walk(res);
    else if (dirent.isFile() && res.endsWith(".css")) yield res;
  }
}

function validateCss(content, file) {
  const errors = [];
  let ast;

  try {
    ast = csstree.parse(content, { positions: true, filename: file });
  } catch (e) {
    errors.push(`${file}: Parse error: ${e.message}`);
    return errors;
  }

  csstree.walk(ast, {
    visit: "Declaration",
    enter(node) {
      if (node.type !== "Declaration") return;

      const prop = node.property;

      // Skip CSS custom props and vendor-prefixed props
      if (prop.startsWith("--") || prop.startsWith("-")) return;

      let match;
      try {
        match = csstree.lexer.matchProperty(prop, node.value);
      } catch {
        // Unknown property in csstree's dictionary — ignore
        return;
      }

      if (!match.matched) {
        const loc =
          node.loc && node.loc.start
            ? `:${node.loc.start.line}:${node.loc.start.column}`
            : "";
        const reason =
          match.error && match.error.rawMessage
            ? match.error.rawMessage
            : "Invalid value";
        errors.push(`${file}${loc} — ${prop}: ${reason}`);
      }
    },
  });

  return errors;
}

let allErrors = [];

for await (const file of walk(BUILD_DIR)) {
  const css = await readFile(file, "utf8");
  const errs = validateCss(css, file);
  allErrors = allErrors.concat(errs);
}

if (allErrors.length) {
  console.error("✖ CSS grammar errors found:\n");
  for (const e of allErrors) console.error("  -", e);
  process.exit(1);
} else {
  console.log("✓ CSS grammar looks valid.");
}
