import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import site from "./src/_data/site.js";
import i18n from "./src/_data/i18n.js";

const globs = { pt: "src/posts/**/*.md", en: "src/en/posts/**/*.md" };

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  for (const [lang, name, outputPath] of [["pt", "posts", "/feed.xml"], ["en", "postsEn", "/en/feed.xml"]]) {
    eleventyConfig.addPlugin(feedPlugin, {
      type: "atom",
      outputPath,
      inputPath: `feed-${lang}.njk`,
      collection: { name, limit: 20 },
      metadata: {
        language: i18n[lang].htmlLang,
        title: site.title,
        subtitle: i18n[lang].description,
        base: site.url,
        author: { name: site.author.name },
      },
    });
  }

  eleventyConfig.addGlobalData("anoAtual", () => new Date().getFullYear());
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  const publicados = (api, lang) =>
    api.getFilteredByGlob(globs[lang]).filter((p) => !p.data.draft).reverse();

  const listaDeTags = (posts) => {
    const tags = new Map();
    for (const post of posts) {
      for (const tag of post.data.tags || []) {
        if (!tags.has(tag)) tags.set(tag, []);
        tags.get(tag).push(post);
      }
    }
    return [...tags.entries()]
      .map(([name, posts]) => ({ name, count: posts.length, posts }))
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  };

  eleventyConfig.addCollection("posts", (api) => publicados(api, "pt"));
  eleventyConfig.addCollection("postsEn", (api) => publicados(api, "en"));
  eleventyConfig.addCollection("tagList", (api) => listaDeTags(publicados(api, "pt")));
  eleventyConfig.addCollection("tagListEn", (api) => listaDeTags(publicados(api, "en")));

  // Página equivalente no outro idioma, ligada pelo campo `translationKey`.
  // Sem tradução, cai na home do idioma de destino.
  eleventyConfig.addFilter("traducao", (all, key, lang) => {
    const alvo = key && all
      .filter((p) => p.data.translationKey === key && p.data.lang === lang)
      .sort((a, b) => a.url.length - b.url.length)[0];
    return alvo ? alvo.url : i18n[lang].home;
  });

  eleventyConfig.addFilter("dataExtensa", (d, lang = "pt") => {
    const mes = i18n[lang].meses[d.getUTCMonth()];
    return lang === "en"
      ? `${mes} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
      : `${d.getUTCDate()} de ${mes} de ${d.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("dataIso", (d) => d.toISOString().slice(0, 10));
  eleventyConfig.addFilter("diaMes", (d, lang = "pt") => {
    const dia = String(d.getUTCDate()).padStart(2, "0");
    const mes = String(d.getUTCMonth() + 1).padStart(2, "0");
    return lang === "en" ? `${mes}/${dia}` : `${dia}/${mes}`;
  });

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
