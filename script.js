const cardContainer = document.querySelector(".card-container");
const inputBusca = document.querySelector("header input");

let dados = [];

// Carrega os dados do JSON uma vez quando o script é iniciado
async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    // Opcional: renderiza todos os cards ao carregar a página
    renderizarCards(dados);
}

function iniciarBusca() {
    const termoBusca = inputBusca.value.toLowerCase();

    if (!termoBusca) {
        renderizarCards(dados); // Se a busca estiver vazia, mostra todos
        return;
    }

    const resultados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(resultados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.ano}</p>
        <p>${dado.descricao}</p>
         <a href="${dado.link}" target="_blank">Saiba mais</a>
    `;
        cardContainer.appendChild(article);

    }

    }

// Inicia o processo carregando os dados
carregarDados();
