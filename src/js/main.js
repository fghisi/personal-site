// Alternância de tema claro/escuro
document.querySelector(".tema")?.addEventListener("click", () => {
  const root = document.documentElement;
  const escuroAtual = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  const novo = escuroAtual ? "light" : "dark";
  root.dataset.theme = novo;
  try { localStorage.setItem("tema", novo); } catch (e) {}
});

// Botão "copiar" nos blocos de código
document.querySelectorAll(".prosa pre").forEach((pre) => {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "copiar";
  botao.textContent = "copiar";
  botao.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pre.querySelector("code")?.innerText ?? pre.innerText);
      botao.textContent = "copiado!";
    } catch (e) {
      botao.textContent = "erro";
    }
    setTimeout(() => (botao.textContent = "copiar"), 1500);
  });
  pre.appendChild(botao);
});
