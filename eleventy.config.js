import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import site from "./src/_data/site.js";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "posts", limit: 20 },
    metadata: {
      language: site.language,
      title: site.title,
      subtitle: site.description,
      base: site.url,
      author: { name: site.author.name },
    },
  });

  eleventyConfig.addGlobalData("anoAtual", () => new Date().getFullYear());
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/**/*.md").filter((p) => !p.data.draft).reverse()
  );

  eleventyConfig.addCollection("tagList", (api) => {
    const tags = new Map();
    for (const post of api.getFilteredByGlob("src/posts/**/*.md")) {
      if (post.data.draft) continue;
      for (const tag of post.data.tags || []) {
        if (tag === "posts") continue;
        tags.set(tag, (tags.get(tag) || 0) + 1);
      }
    }
    return [...tags.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  });

  const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho",
    "agosto", "setembro", "outubro", "novembro", "dezembro"];

  eleventyConfig.addFilter("dataExtensa", (d) =>
    `${d.getUTCDate()} de ${months[d.getUTCMonth()]} de ${d.getUTCFullYear()}`);
  eleventyConfig.addFilter("dataIso", (d) => d.toISOString().slice(0, 10));
  eleventyConfig.addFilter("diaMes", (d) =>
    `${String(d.getUTCDate()).padStart(2, "0")}/${String(d.getUTCMonth() + 1).padStart(2, "0")}`);
  eleventyConfig.addFilter("ano", (d) => d.getUTCFullYear());
  eleventyConfig.addFilter("semPosts", (tags = []) => tags.filter((t) => t !== "posts"));

  eleventyConfig.addFilter("tempoLeitura", (content = "") => {
    const words = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
  });

  eleventyConfig.addFilter("porAno", (posts) => {
    const groups = [];
    for (const post of posts) {
      const year = post.date.getUTCFullYear();
      let group = groups.at(-1);
      if (!group || group.year !== year) groups.push((group = { year, posts: [] }));
      group.posts.push(post);
    }
    return groups;
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
