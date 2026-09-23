# Caderno de Bordo

Blog pessoal estático gerado com [Eleventy](https://www.11ty.dev/).

A estrutura segue o formato clássico de um blog técnico (lista de posts na home,
arquivo por ano, tags, página "sobre", feed Atom, modo claro/escuro e realce de
código), com design, código e textos próprios.

## Rodando localmente

```bash
npm install
npm run dev     # servidor em http://localhost:8080 com recarga automática
npm run build   # gera o site estático em _site/
```

## Escrevendo um post

Crie um arquivo em `src/posts/` com o nome `AAAA-MM-DD-slug.md`:

```markdown
---
title: "Título do post"
description: "Resumo de uma linha (aparece na home e no feed)."
tags: [linux, ferramentas]
draft: false   # true = não publica
---

Conteúdo em Markdown...
```

A URL gerada fica `/AAAA/MM/DD/slug/`.

## Onde personalizar

| O quê                         | Arquivo                         |
|-------------------------------|---------------------------------|
| Nome, descrição, URL, menu    | `src/_data/site.js`             |
| Página "Sobre"                | `src/sobre.md`                  |
| Cores, fontes e layout        | `src/css/style.css`             |
| Cores do realce de código     | `src/css/code.css`              |
| Estrutura HTML                | `src/_includes/layouts/`        |

## Publicação

O conteúdo de `_site/` pode ser servido por qualquer hospedagem estática
(GitHub Pages, Netlify, Cloudflare Pages, Vercel).
