const corpoTabela = document.getElementById("corpoTabela");

fetch('https://api.restful-api.dev/objects')
  .then(res => res.json())
  .then(lista => {
    corpoTabela.innerHTML = "";

    if (!Array.isArray(lista) || !lista.length) {
      corpoTabela.innerHTML = `<tr><td colspan="4" style="text-align:center;">Nenhum dado disponível.</td></tr>`;
      return;
    }

    lista.slice(0, 10).forEach((item, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${item.name}</td>
        <td class="acao">
          <a href="editar.html?id=${item.id}" title="Editar">
            <i class="fa-solid fa-pen-to-square editar"></i>
          </a>
        </td>
        <td class="acao">
          <button class="btn-excluir" title="Deletar" data-id="${item.id}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      `;
      corpoTabela.appendChild(tr);
    });

    // Ações de exclusão
    document.querySelectorAll(".btn-excluir").forEach(btn => {
      btn.addEventListener("click", async e => {
        const id = e.currentTarget.getAttribute("data-id");
        const confirmar = confirm("Deseja realmente excluir este item?");

        if (!confirmar) return;

        try {
          const response = await fetch(`https://api.restful-api.dev/objects/${id}`, {
            method: "DELETE"
          });

          if (!response.ok) throw new Error("Falha ao excluir");

          e.currentTarget.closest("tr").remove();
          alert("Item excluído com sucesso!");
        } catch (err) {
          console.error(err);
          alert("Erro ao excluir o item.");
        }
      });
    });
  })
  .catch(err => {
    console.error("Erro ao carregar lista:", err);
    corpoTabela.innerHTML = `<tr><td colspan="4" style="text-align:center;color:red;">Erro ao carregar a lista.</td></tr>`;
  });
