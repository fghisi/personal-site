# fghisi.com.br

Site pessoal de Fernando Ghisi, feito para divulgar meu portfólio, artigos,
trabalhos e projetos. É um site estático gerado com
[Eleventy](https://www.11ty.dev/), em português e inglês.

Tem lista de artigos na home, arquivo por ano, tags, página "Sobre", feed Atom,
modo claro/escuro e realce de código, com design, código e textos próprios.

## Rodando localmente

Requer Node.js 18+ (o arquivo `.nvmrc` fixa a versão 22). Com o
[nvm](https://github.com/nvm-sh/nvm), basta rodar `nvm use` na pasta do projeto.

```bash
nvm install     # instala a versão do .nvmrc (só na primeira vez)
nvm use
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

## Versão em inglês

Posts em inglês ficam em `src/en/posts/` e aparecem em `/en/`. Para ligar um post
à sua tradução (e fazer o seletor PT | EN do topo levar direto a ela), use o mesmo
`translationKey` nos dois arquivos:

```markdown
translationKey: ola-mundo
```

Sem tradução, o seletor leva para a página inicial do outro idioma.

## Modo "em construção"

Com `emConstrucao: true` em `src/_data/site.js`, a página inicial e o arquivo
mostram um aviso de "Em construção" no lugar da lista de posts. Mude para
`false` quando for publicar os primeiros textos. O texto do aviso fica em
`src/_data/i18n.js`.

## Tema claro/escuro

No topo, o interruptor **auto** faz o site seguir o tema do sistema. O botão de
sol/lua escolhe manualmente (e desliga o auto). A escolha fica salva no navegador.

## Onde personalizar

| O quê                         | Arquivo                         |
|-------------------------------|---------------------------------|
| Nome do site, URL, redes sociais | `src/_data/site.js`             |
| Descrição, menu e textos (PT/EN) | `src/_data/i18n.js`          |
| Página "Sobre"                | `src/sobre.md` e `src/en/about.md` |
| Cores, fontes e layout        | `src/css/style.css`             |
| Cores do realce de código     | `src/css/code.css`              |
| Estrutura HTML                | `src/_includes/layouts/`        |
| Símbolo do topo e logo da home (SVG inline, seguem o tema) | `src/_includes/simbolo.njk` e `src/_includes/logo.njk` |
| Arquivos originais da logo    | `src/img/logo/`                 |
| Favicons                      | `src/favicon.ico`, `src/favicon.svg`, `src/apple-touch-icon.png` |

## Análise de acessos (Google Analytics 4)

O site e o amardoar medem acessos e cliques com o GA4, **só depois de a pessoa
aceitar** no banner de cookies. Antes disso nada é carregado. A escolha fica
salva no navegador e pode ser mudada pelo link "Cookies" no rodapé.

- ID de medição: `ga4` em `src/_data/site.js` (vazio = sem medição e sem banner).
- Script: `src/analytics.njk`, que gera `/js/analytics.js`, usado pelo layout e
  pelo amardoar.
- Em `localhost` nada é enviado ao Google: os eventos aparecem no console.

Eventos enviados (além das visualizações de página e da medição automática do
GA4, que já registra cliques em links externos):

| Evento | Onde | Parâmetros |
|---|---|---|
| `clique_menu` | menu do site | `item` |
| `clique_rede_social` | ícones GitHub/LinkedIn/X | `rede` |
| `clique_sobre_mim` | link "conheça um pouco mais sobre mim" | — |
| `clique_menu_amardoar` | topo do amardoar | `item` |
| `clique_instituicao` | card de instituição | `instituicao`, `causa`, `cidade` |
| `filtro_causa` | filtros de causa | `causa` |
| `filtro_cidade` | filtro de cidade | `cidade` |
| `busca_usada` | busca do amardoar (uma vez por visita, sem o texto) | — |

Para ver os parâmetros nos relatórios, cadastre cada um como **dimensão
personalizada** com escopo de evento no GA4 (Administrador → Definições
personalizadas): `item`, `rede`, `instituicao`, `causa` e `cidade`.

Para marcar um novo clique, basta adicionar `data-ga="nome_do_evento"` ao
elemento; atributos `data-ga-<campo>` viram parâmetros.

## Projetos

Projetos independentes ficam em pastas próprias dentro de `src/`, com HTML, CSS e
JS próprios, e são copiados como estão, sem o layout do site:

| Projeto | Endereço | Pasta |
|---------|----------|-------|
| amardoar | `/amardoar/` | `src/amardoar/` |

Para adicionar outro, crie a pasta e registre-a no `eleventy.config.js`
(`ignores.add` e `addPassthroughCopy`), como foi feito com o amardoar.

## Publicação

O conteúdo de `_site/` pode ser servido por qualquer hospedagem estática
(GitHub Pages, Netlify, Cloudflare Pages, Vercel).
