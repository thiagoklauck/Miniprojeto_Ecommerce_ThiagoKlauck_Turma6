import type { Cliente } from "./types";

// Clientes iniciais para demonstrar as operações do sistema.
const clientes: Cliente[] = [
    { id: 1, nome: "Aldnei Filho", email: "aldnei@email.com" },
    { id: 2, nome: "João Pedro Saldanha", email: "joao@email.com" },
    { id: 3, nome: "Jeferson Drozczak ", email: "jefe@email.com" },
];
// Colocar validações na função também, para não depender apenas do main.ts.
//  Pois se alguém hipoteticamente chamar a função de outro lugar, não vai ter validação.
function cadastrarCliente(cliente: Cliente): void {
    let valorInvalido: boolean = false; // Variável para rastrear se algum valor é inválido, ao invés de delcarar as codiçoes de novo no fim.

    if (cliente.id <= 0 || isNaN(cliente.id)) {
        console.log("O ID do cliente deve ser um número maior que zero.");
        valorInvalido = true;
    }

    if (cliente.nome.trim() === "") {
        console.log("O nome do cliente não pode estar vazio.");
        valorInvalido = true;
    }

    if (cliente.email.trim() === "") {
        console.log("O email do cliente não pode estar vazio.");
        valorInvalido = true;
    }

    const clienteExistente = clientes.find(                    
        clienteCadastrado => clienteCadastrado.id === cliente.id);

    if (clienteExistente) {
        console.log("Já existe um cliente com esse ID.");
        valorInvalido = true;
    }

    const emailExistente = clientes.find(
        clienteCadastrado => clienteCadastrado.email === cliente.email);

    if (emailExistente) {
        console.log("Já existe um cliente com esse email.");
        valorInvalido = true;
    }

    if (valorInvalido) {
        return;// dessa forma exibe, se houver, todas as mensagens de erro de uma vez só, e não apenas a primeira que encontrar.
    }

    clientes.push(cliente);// só vai chegar no push se não houver nenhum erro.
}

// Consulta o cliente pelo ID informado.
function buscarClientePorId(id: number): Cliente | undefined {
    return clientes.find(clienteCadastrado => clienteCadastrado.id === id);
}

function verClientes(): Cliente[] {
    return clientes;
}

export {
    cadastrarCliente,
    verClientes,
    buscarClientePorId
};

