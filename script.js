/*const container = document.getElementById("containerlista");

// Faz a requisição para a API
fetch('https://api.restful-api.dev/objects')
    .then(response => response.json())
    .then(json => {
        // Se o json não for um array, tenta pegar json.data
        const lista = Array.isArray(json) ? json : json.data;

        if (!lista || !lista.length) {
            container.innerHTML = "<li>Nenhum dado disponível.</li>";
            return;
        }

        lista.forEach((item, indice) => {
            const li = document.createElement("li");

            // Criamos o link que leva à página detalhe.html com o ID como parâmetro
            const link = document.createElement("a");
            link.href = `detalhe.html?id=${item.id}`;
            link.textContent = `#${indice + 1} - ID: ${item.id}, Nome: ${item.name}`;

            li.appendChild(link);
            container.appendChild(li);
        });
    })
    .catch(err => {
        console.error("Erro ao carregar lista:", err);
        container.innerHTML = "<li>Erro ao carregar a lista.</li>";
    });
  
      document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-produto");
  const container = document.getElementById("container");
  const overlay = document.getElementById("overlay");
  const btnVoltar = document.getElementById("btn-voltar");
  const botaoEnviar = document.getElementById("botao-enviar");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("📤 Enviando dados...");

    const dados = {
      name: document.getElementById("name").value,
      data: {
        year: Number(document.getElementById("year").value),
        price: Number(document.getElementById("price").value),
        "CPU model": document.getElementById("cpu").value,
        "Hard disk size": document.getElementById("disk").value,
      },
    };

    try {
      botaoEnviar.disabled = true;
      botaoEnviar.textContent = "Enviando...";

      const resposta = await fetch("https://api.restful-api.dev/objects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      console.log("📡 Status da resposta:", resposta.status);

      if (!resposta.ok) throw new Error("Erro no envio: " + resposta.status);

      const json = await resposta.json();
      console.log("✅ Sucesso! Resposta JSON:", json);

      // Exibe o overlay de sucesso
      container.style.display = "none";
      overlay.style.display = "flex";

    } catch (erro) {
      console.error("❌ Erro ao enviar:", erro);
      alert("Erro ao enviar: " + erro.message);
    } finally {
      botaoEnviar.disabled = false;
      botaoEnviar.textContent = "Enviar";
    }
  });

  btnVoltar.addEventListener("click", () => {
    overlay.style.display = "none";
    container.style.display = "block";
    form.reset();
  });
});*/ 
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-produto");
  const container = document.getElementById("container");
  const overlay = document.getElementById("overlay");
  const botaoVoltar = document.getElementById("btn-voltar");
  const botaoEnviar = document.getElementById("botao-enviar");

  // Ao enviar o formulário
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const dados = {
      name: document.getElementById("name").value.trim(),
      data: {
        year: Number(document.getElementById("year").value),
        price: Number(document.getElementById("price").value),
        "CPU model": document.getElementById("cpu").value.trim(),
        "Hard disk size": document.getElementById("disk").value.trim(),
      },
    };

    if (!dados.name || !dados.data.year || !dados.data.price) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      botaoEnviar.disabled = true;
      botaoEnviar.textContent = "Enviando...";

      // === Envio para API ===
      const resposta = await fetch("https://api.restful-api.dev/objects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) throw new Error("Erro ao enviar: " + resposta.status);

      const resultado = await resposta.json();
      console.log("✅ Dados enviados:", resultado);

      // === Mostra mensagem de sucesso ===
      container.style.opacity = "0";
      setTimeout(() => {
        container.style.display = "none";
        overlay.classList.add("mostrar");
      }, 400);

    } catch (erro) {
      alert("Erro ao enviar: " + erro.message);
      console.error(erro);
    } finally {
      botaoEnviar.disabled = false;
      botaoEnviar.textContent = "Enviar";
    }
  });

  // Botão "Voltar"
  botaoVoltar.addEventListener("click", () => {
    overlay.classList.remove("mostrar");
    container.style.display = "block";
    setTimeout(() => (container.style.opacity = "1"), 50);
    form.reset();
  });
});

