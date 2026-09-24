import i18n from "./_data/i18n.js";

export default {
  lang: "pt",
  eleventyComputed: {
    // `t` = textos da interface no idioma da página
    t: (data) => i18n[data.lang],
  },
};
