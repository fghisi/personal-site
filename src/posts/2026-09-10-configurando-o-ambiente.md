---
title: "Configurando um ambiente de desenvolvimento reproduzível"
description: "Dotfiles versionados, um script de bootstrap e nada de 'na minha máquina funciona'."
tags: [linux, ferramentas, dotfiles]
---

Trocar de computador não deveria custar um fim de semana. A ideia aqui é simples:
**tudo que configura o meu ambiente mora em um repositório Git**.

## Estrutura

```text
dotfiles/
├── bootstrap.sh
├── git/.gitconfig
├── shell/.zshrc
└── nvim/init.lua
```

## O script de bootstrap

Ele cria links simbólicos para cada arquivo, sem sobrescrever nada existente:

```bash
#!/usr/bin/env bash
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"

link() {
  local origem="$DIR/$1" destino="$HOME/$2"
  if [[ -e "$destino" && ! -L "$destino" ]]; then
    echo "backup: $destino -> $destino.bak"
    mv "$destino" "$destino.bak"
  fi
  ln -sfn "$origem" "$destino"
}

link git/.gitconfig .gitconfig
link shell/.zshrc   .zshrc
link nvim           .config/nvim
```

## Dica final

Rode o script numa máquina virtual limpa de vez em quando. Se algo falhar lá,
vai falhar no seu próximo notebook também — só que numa hora pior.
