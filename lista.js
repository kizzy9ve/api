const container = document.getElementById("containerlista");

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