import globby from "globby";

async function main() {
  {
    const files = globby("contents/story/**/*.{md,mdx}");
    console.log("story", (await files).length);
  }
  {
    const files = globby("contents/tricks/**/*.{md,mdx}");
    console.log("notes", (await files).length);
  }
  {
    const files = globby("contents/tricks/**/*.{jpg,jpeg,png,svg,gif}");
    console.log("images", (await files).length);
  }
}
(async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
