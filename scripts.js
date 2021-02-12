const Modal = {
    open() {
        // Abrir Modal
        // adicionoar a classe que ativa ao modal
        document
            .querySelector('.modal-overlay')
            .classList.add('active')
    },
    close() {
        // Fechar o Modal
        // Remover a classe active
        document
            .querySelector('.modal-overlay')
            .classList.remove('active')
    }

}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50001,
        date: '23/01/2021'
    },
    {
        id: 2,
        description: 'Criaçao do Site',
        amount: 500000,
        date: '23/01/2021'
    },
    {
        id: 1,
        description: 'Agua',
        amount: -10000,
        date: '23/01/2021'
    },
]


/*  Eu preciso somar as entradas
    depois preciso somar as saidas e 
    remover o valor das saidas assim terei o total */

const Transaction = {
    incomes() {
        // Somar as entradas
    },
    expenses() {
        // somar as Saidas
    },
    total() {

    }
}

const DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)


    },


    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <tr>
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        </tr>
        `
        return html;
    }
}

const Utils = {
    formatCurrency(value) {
        // colocar o numero em negativo se ele tiver o menos na frente
        const signal = Number(value) < 0 ? "-" : "";

        // Formatar para casas decimais e a moeda em real Brasileiro
        value = String(value).replace(/\D/g, "");
        value = Number(value) / 100;
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

// adicionar os objetos do array na tela de listagem
transactions.forEach(function (transaction) {
    DOM.addTransaction(transaction)
})

