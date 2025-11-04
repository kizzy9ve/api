const container = document.getElementById("containerlista");

//Forma antiga de chamar uma API
// var xhr = new XMLHttpRequest();
// var requestUrl = "https://api.restful-api.dev/objects";
// xhr.open("GET", requestUrl, true);
// xhr.onload = function () {
//       var json = JSON.parse(xhr.responseText);
//       exibeElementosNaTela(json);
// }
// xhr.send();

//Forma moderna de chamar uma API
// Fazemos a requisição para a API
fetch('https://api.restful-api.dev/objects')
      .then(response => response.json()) // converte a resposta em JSON
      .then(json => exibeElementosNaTela(json))

function exibeElementosNaTela(json) {
      // Loop com forEach para percorrer cada item
      json.forEach((item, indice) => {
            // Criamos um <li> para cada item
            const li = document.createElement("li");

            // Definimos o conteúdo do <li>
            li.textContent = `#${indice + 1} - ID: ${item.id}, Nome: ${item.name}`;

            // Adicionamos o <li> no container da lista
            container.appendChild(li);
      });
}