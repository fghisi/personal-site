// Tema: "auto" segue o sistema; o botão sol/lua escolhe manualmente e desliga o auto.
const root = document.documentElement;
const sistemaEscuro = matchMedia("(prefers-color-scheme: dark)");
const auto = document.querySelector(".auto__input");
const botaoTema = document.querySelector(".tema");

const salvar = (valor) => {
  try {
    valor ? localStorage.setItem("tema", valor) : localStorage.removeItem("tema");
  } catch (e) {}
};

const temaEfetivo = () => root.dataset.theme || (sistemaEscuro.matches ? "dark" : "light");

if (auto) {
  auto.checked = !root.dataset.theme;
  auto.addEventListener("change", () => {
    if (auto.checked) {
      delete root.dataset.theme;
      salvar(null);
    } else {
      root.dataset.theme = temaEfetivo();
      salvar(root.dataset.theme);
    }
  });
}

botaoTema?.addEventListener("click", () => {
  const novo = temaEfetivo() === "dark" ? "light" : "dark";
  root.dataset.theme = novo;
  salvar(novo);
  if (auto) auto.checked = false;
});

// Botão "copiar" nos blocos de código
document.querySelectorAll(".prosa pre").forEach((pre) => {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "copiar";
  botao.textContent = root.lang.startsWith("pt") ? "copiar" : "copy";
  const rotulo = botao.textContent;
  botao.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pre.querySelector("code")?.innerText ?? pre.innerText);
      botao.textContent = "✓";
    } catch (e) {
      botao.textContent = "✗";
    }
    setTimeout(() => (botao.textContent = rotulo), 1500);
  });
  pre.appendChild(botao);
});
