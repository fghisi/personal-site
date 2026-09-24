---
title: "Testes que valem a pena escrever"
description: "Nem todo teste paga o próprio custo. Algumas heurísticas para decidir onde investir."
tags: [testes, boas-praticas]
---

Cobertura de 100% não é objetivo; é, no máximo, um efeito colateral.
O que importa é: **se esse código quebrar, algum teste vai me avisar?**

## Três perguntas antes de escrever um teste

1. Este comportamento é importante para quem usa o sistema?
2. Ele pode quebrar sem que eu perceba?
3. O teste vai continuar válido se eu refatorar a implementação?

Se a resposta à terceira for "não", provavelmente você está testando *como* e não *o quê*.

## Um exemplo

```js
// Frágil: depende de detalhes internos
expect(carrinho._itens.length).toBe(2);

// Robusto: verifica o comportamento observável
expect(carrinho.total()).toBe(59.8);
```

| Tipo de teste | Velocidade | Confiança | Custo de manutenção |
|---------------|-----------|-----------|---------------------|
| Unitário      | alta      | média     | baixo               |
| Integração    | média     | alta      | médio               |
| Ponta a ponta | baixa     | muito alta| alto                |

Equilíbrio é tudo: muitos unitários, uma boa camada de integração e poucos E2E nos fluxos críticos.
