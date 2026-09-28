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

## Publicação

O site publicado é só o conteúdo de `_site/`, gerado pelo `npm run build`.
Não suba a pasta do projeto inteira para a hospedagem.

O deploy no Hostinger é automático: a cada push na `main`, o workflow
`.github/workflows/deploy.yml` roda o build e envia o `_site/` por FTP. Também
dá para rodar manualmente em **Actions → Deploy → Run workflow**.

Para funcionar, cadastre no GitHub (**Settings → Secrets and variables →
Actions**) os secrets `FTP_SERVER`, `FTP_USERNAME` e `FTP_PASSWORD`, com os
dados de FTP do hPanel. Se a pasta de destino não for `public_html/`, crie a
variável `FTP_DIR` com o caminho certo.
