---
title: "Do código à gestão, e de volta ao código: construindo o amardoar com IA"
description: "Como uma ideia antiga de ajudar o próximo virou um site, e o que aprendi construindo-o com uma IA como par de programação."
tags: [amardoar, lideranca, ia, eleventy]
---

## De onde eu venho

Comecei minha carreira escrevendo software. Passei por empresas de tecnologia em **Blumenau** e **Curitiba** e me especializei em **desenvolvimento backend com Python**. Com o tempo, fui evoluindo para construir soluções em **cloud**, usando a **AWS**. Por muitos anos, o meu dia foi feito de código, deploys e problemas que só apareciam em produção.

Hoje lidero a área de tecnologia da **PagueVeloz by Serasa**, organizada em três frentes: times de produto, que constroem adquirência, core banking e backoffice; Platform Engineering, com developer experience, segurança, observabilidade, DevOps/SRE e cloud; e o time de Dados.

A transição do *hands-on* para a liderança técnica muda o tipo de problema que ocupa a cabeça. Saem as linhas de código, entram as decisões: prioridade, arquitetura, pessoas, prazo. Uma coisa não muda: no mercado de pagamentos, acredito que **velocidade é a vantagem competitiva real**. Decisões rápidas, ciclos curtos e tecnologia que remove atrito em vez de adicionar processo.

Este projeto nasceu um pouco dessa vontade: voltar a construir com as próprias mãos, e testar na prática como a IA muda a forma de construir.

{% include "figuras/amardoar-trajetoria.njk" %}

## Uma ideia de muitos anos atrás

Há muito tempo eu carregava uma ideia: **facilitar o caminho entre quem quer doar e quem cuida**. Muita gente tem vontade de ajudar, mas não sabe por onde começar nem em quem confiar. Do outro lado, instituições sérias fazem um trabalho enorme e têm pouca visibilidade.

A ideia nasceu de algo simples: a vontade de ajudar o próximo. Acredito muito em fazer o bem ao outro, não importa quem seja, sem esperar nada em troca. Faltava transformar essa vontade em algo concreto, que também ajudasse outras pessoas a fazer o mesmo.

O [amardoar](/amardoar/) é essa ideia saindo do papel. Hoje ele reúne instituições de caridade de Santa Catarina, organizadas por causa e por cidade, e leva você direto aos canais oficiais de cada uma. O amardoar não recebe dinheiro nem intermedia nada: a ajuda é combinada direto com a instituição.

> Este projeto é o meu amor ao próximo transformado em ação.

O nome junta as duas palavras do propósito, *amar* e *doar*, e a logo também: um coração dividido em duas metades, uma de cada cor, que só faz sentido inteiro.

## Construindo com uma IA como par

Todo o site, este blog e o amardoar, foi construído em sessões com o **Claude Code**, um agente de programação da Anthropic que trabalha direto no repositório: lê o código, roda comandos, abre o site num navegador para conferir o resultado e cria branches e pull requests no GitHub.

O ponto mais interessante não foi a velocidade, embora ela seja real. Foi a **divisão de papéis**. Eu descrevia a intenção ("quero algo que remeta a tecnologia, mas minimalista"), a IA explorava e trazia opções concretas, e a decisão ficava comigo. Foi assim com a logo, com quatro propostas desenhadas lado a lado, com o nome do projeto e com a forma de medir os acessos.

{% include "figuras/amardoar-ciclo-ia.njk" %}

Também fui criando regras de trabalho, como faria com um time. A principal: **toda alteração numa branch nova, com pull request para a `develop`**, que depois segue para a `main`. Isso deixou cada mudança pequena, revisável e fácil de desfazer. Quase 30 pull requests depois, o histórico conta a evolução do site passo a passo.

## A parte técnica

### Um site estático com Eleventy

O site é gerado pelo [Eleventy](https://www.11ty.dev/), um gerador de sites estáticos em Node.js. Os posts são arquivos Markdown; os layouts usam Nunjucks; textos da interface em português e inglês ficam em arquivos de dados. No build, tudo vira HTML, CSS e JavaScript simples em `_site/`, que qualquer hospedagem serve, sem banco de dados nem servidor de aplicação.

Para um site pessoal, isso significa carregamento rápido, custo baixo e quase nada para atacar. O amardoar tem HTML, CSS e JavaScript próprios e é copiado como está para `/amardoar/`, sem passar pelo layout do blog.

{% include "figuras/amardoar-arquitetura.njk" %}

### Uma logo que é uma linha de terminal

Pedi algo que remetesse a tecnologia, mas minimalista. Das quatro propostas, escolhi a do terminal: um prompt `>` seguido de `fghisi` e de um cursor piscando.

O detalhe técnico de que mais gosto: o texto "hisi" é a fonte **JetBrains Mono** convertida em vetor com a biblioteca `fontTools`, em Python. Assim a logo não depende de carregar a fonte. O símbolo `>fg` foi redesenhado na mesma grade e com a mesma espessura de traço da fonte, para a logo inteira parecer uma única linha monoespaçada. As cores usam `currentColor`, então a logo acompanha o tema claro ou escuro sozinha.

### Tema, movimento e acessibilidade

- **Tema claro/escuro:** as cores são variáveis CSS (`--bg`, `--fg`…) redefinidas para o modo escuro. O modo "auto" segue o sistema via `prefers-color-scheme`; a escolha manual fica no `localStorage` e é aplicada por um script no `<head>`, antes da primeira pintura, para a tela não piscar.
- **Transições entre páginas:** a *View Transitions API* faz o fade entre páginas e na troca de tema, com o topo parado.
- **Movimento reduzido:** toda animação é desligada com `prefers-reduced-motion`. Quem pede menos movimento no sistema vê o site estático.

### O coração animado do amardoar

O topo do amardoar é um `<canvas>` animado a partir da própria logo. As duas metades do coração são os mesmos caminhos SVG da marca, desenhados com `Path2D`. Elas chegam de lados opostos e se encaixam (*amar + doar*). Depois, pequenos corações, as doações, viajam até o centro numa **curva de Bézier quadrática**, e o coração pulsa de leve a cada um que chega.

{% include "figuras/amardoar-bezier.njk" %}

Esse trecho rendeu um bom aprendizado. Na primeira versão, os corações aceleravam no começo (*ease-out*) e passavam quase todo o trajeto escondidos atrás da logo: com 61% do tempo, já estavam a 94% do caminho. Bastou inverter a curva para `q = p²` (*ease-in*): eles ficam visíveis em volta e só aceleram no fim, como se fossem absorvidos. Para não gastar bateria, um `IntersectionObserver` pausa a animação quando ela sai da tela.

### Dados reais, sem inventar nada

O protótipo começou com instituições fictícias, com histórias, números e até chaves Pix de exemplo. Ao trocar pela lista real de instituições de Santa Catarina, a regra foi clara: **não inventar nada sobre instituições reais**. Cada card mostra só o que é verificável: nome, cidade, causa e o link para o site oficial. Nem a logo é gerada: ela vem do próprio site da instituição.

A busca ignora acentos, então "criancas" encontra "Crianças". A técnica é normalizar o texto (`normalize("NFD")`) e remover os sinais diacríticos antes de comparar. Os filtros consideram a causa principal e a secundária de cada instituição.

Na verificação dos links, apareceram dois domínios que não existem e um site fora do ar. É o tipo de coisa que passa despercebida sem um passo de checagem.

### Um problema real de produção: cache

Depois da primeira publicação, o site apareceu "quebrado": a logo desalinhada, o topo sem estilo e nenhum efeito. O HTML era novo, mas o navegador usava o CSS antigo, porque a hospedagem manda guardar CSS e JS por 7 dias.

A solução clássica é o **cache busting**: um filtro do Eleventy calcula um hash do conteúdo de cada arquivo e o coloca na URL.

```html
<link rel="stylesheet" href="/css/style.css?v=9b68ea03df">
```

Quando o arquivo muda, o hash muda, e o navegador baixa a versão nova. Quando não muda, o cache continua valendo.

### Medir com respeito à privacidade

Para saber se o projeto interessa às pessoas, o site usa o **Google Analytics 4**, mas só depois do consentimento, como orienta a LGPD. Antes do "Aceitar" no banner, nenhum script do Google é carregado. Além das visitas, o site registra eventos que respondem a perguntas concretas: quais instituições recebem cliques, quais causas e cidades são mais filtradas e se a busca é usada, sem enviar o texto digitado.

{% include "figuras/amardoar-consentimento.njk" %}

## O que aprendi

- **A IA acelera a execução; a direção continua humana.** Escolher a logo, o nome, o que medir e, principalmente, o que *não* fazer (como inventar dados sobre instituições reais) foram decisões minhas. É o mesmo papel que exerço como gestor: dar contexto e intenção, e deixar a execução fluir.
- **Verificar é parte do trabalho, não um extra.** O coração escondido atrás da logo, o cache de 7 dias e os links quebrados só apareceram porque cada mudança foi testada no navegador e conferida contra os dados.
- **Processo leve também vale para projeto pessoal.** Branches pequenas e pull requests deixaram a evolução segura e o histórico legível, sem burocracia.
- **Errar rápido e corrigir rápido.** Houve erros, como um commit direto na branch principal e uma regra de CSS no lugar errado. Cada um virou uma regra ou um teste. Velocidade, no fim, é isso: ciclos curtos com aprendizado em cada volta.

## Próximos passos

Hoje o amardoar está focado em Santa Catarina. Se o site mostrar engajamento, e as métricas vão dizer isso, os próximos passos são dois:

- **Expandir para outros estados**, levando a mesma curadoria para novas regiões.
- **Abrir a possibilidade de doar pelo próprio amardoar.** Hoje o amardoar não aceita pagamentos: toda ajuda vai direto para a instituição. No futuro, existe a possibilidade de receber a doação no próprio site e fazer o *split* do pagamento entre as instituições, ou seja, uma única doação dividida automaticamente entre várias causas. É o ponto em que o projeto encontra o meu dia a dia, já que trabalho justamente com tecnologia para pagamentos.

Se você conhece uma instituição séria que deveria estar lá, quer ajudar de alguma forma ou só conversar sobre a ideia, me adicione no [LinkedIn](https://www.linkedin.com/in/fghisi/).

**[Conheça o amardoar →](/amardoar/)**
