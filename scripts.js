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

};

const Transaction = {

    all: [
        {
            description: 'Luz',
            amount: -50035,
            date: '23/01/2021'
        },
        {
            description: 'Criaçao do Site',
            amount: 500000,
            date: '23/01/2021'
        },
        {
            description: 'Agua',
            amount: -10000,
            date: '23/01/2021'
        },
    ],

    add(transaction) {
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1);

        App.reload()
    },

    incomes() {
        let income = 0

        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {

                income += transaction.amount
            }
        })


        return income;
    },
    expenses() {

        let expense = 0

        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {

                expense += transaction.amount
            }
        })

        return expense;


    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
};

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
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes());
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses());
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total());
    },

    clearTransaction() {
        DOM.transactionsContainer.innerHTML = "";
    }
};

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
};

const Form = {

    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    formData() {

    },

    validateFields() {
        const { description, amount, date } = Form.getValues()

        if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por favor preencha todos os campos")
        }
        console.log(Form.getValues())
    },

    submit(event) {

        event.preventDefault()
        try {



            Form.validateFields()

        } catch (error) {
            alert(error.message)
        }





    }
}

const App = {
    init() {

        // adicionar os objetos do array na tela de listagem
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance();


    },

    reload() {
        DOM.clearTransaction();
        App.init();
    },
}

App.init();

