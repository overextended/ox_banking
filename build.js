import { build } from "esbuild";

const production =
  process.argv.findIndex((argItem) => argItem === "--mode=production") >= 0;

const onRebuild = (context) => {
  return async (err, res) => {
    if (err) {
      return console.error(`[${context}]: Rebuild failed`, err);
    }

    console.log(`[${context}]: Rebuild succeeded, warnings:`, res.warnings);
  };
};

const server = {
  platform: "node",
  target: ["node16"],
  format: "cjs",
};

const client = {
  platform: "browser",
  target: ["chrome93"],
  format: "iife",
};

for (const context of ["client", "server"]) {
  build({
    bundle: true,
    entryPoints: [`${context}/${context}.ts`],
    outfile: `dist/${context}.js`,
    watch: production
      ? false
      : {
          onRebuild: onRebuild(context),
        },
    ...(context === "client" ? client : server),
  })
    .then(() => console.log(`[${context}]: Built successfully!`))
    .catch(() => process.exit(1));
}
