// Função para encontrar a mediana das medianas usando o algoritmo Dividir e Conquistar
function medianOfMedians(arr) {
    const chunkSize = 5; // Tamanho dos grupos para calcular a mediana
    const chunks = []; // Array de arrays de 5 elementos

    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }

    // Calcular as medianas dos grupos
    const medians = chunks.map(chunk => chunk.sort((a, b) => a - b)[Math.floor(chunk.length / 2)]);

    // Calcular a mediana das medianas
    if (medians.length <= 5) {
        return median(medians);
    } else {
        return medianOfMedians(medians);
    }
}

// Função para calcular a mediana de um array
function median(values) {
    const sorted = values.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    } else {
        return sorted[middle];
    }
}

var arr_idades = [];
var arr_renda = []

function adiciona_dados() {
    let idade = parseFloat(document.getElementById("valorIdade").value);
    let renda = parseFloat(document.getElementById("valorRenda").value);

    if (!idade && !renda) {
        let tipo = "alert alert-danger"
        let mensagem = "Campo(s) de idade e/ou renda vazio(s)";

        notificar(mensagem, tipo)
    } else {
        arr_idades.push(idade);
        arr_renda.push(renda);

        document.getElementById('div_dados').style.display = '';
        const dadosDiv = document.getElementById('dados');
        dadosDiv.innerHTML = '';

        const lista = document.createElement('ul');
        dadosDiv.appendChild(lista);

        for (let index = 0; index < arr_idades.length; index++) {
            const item = document.createElement('li');
            item.textContent = `Idade: ${arr_idades[index]} - Renda: ${arr_renda[index]}`;
            lista.appendChild(item);
        }

        // Limpar os inputs após adicionar os dados
        document.getElementById("valorIdade").value = "";
        document.getElementById("valorRenda").value = "";

        // mensagem
        let tipo = "alert alert-success"
        let mensagem = "Dados inseridos com sucesso";

        notificar(mensagem, tipo)

    }
}

function notificar(mensagem, tipo) {
    const notificacao = document.getElementById("notificacao");
    notificacao.className = tipo
    notificacao.innerHTML = mensagem;
}

function calcularMediana() {
    if (!arr_idades[0] && !arr_renda[0]) {
        var mensagem = `Insira valores para o calculo das medianas`;
        var tipo = "alert alert-danger"
    } else {
        let medianaIdades = medianOfMedians(arr_idades);
        let medianaRenda = medianOfMedians(arr_renda);

        var mensagem = `A mediana das idades e da renda são respectivamente: ${medianaIdades} e ${medianaRenda}`
        var tipo = "alert alert-warning"
    }

    notificar(mensagem, tipo);
}

// // Exemplo de idades dos consumidores
// const ages = [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 1, 2, 7, 9, 10, 100];
// const incomes = [2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000];