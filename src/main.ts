import promptSync = require('prompt-sync');
import { cadastrarCliente, verClientes } from './clientes' ;
import type { Cliente } from "./types";

const prompt = promptSync({ sigint: true });

const nomeInput : string = prompt('Digite o nome do cliente');
const idadeInput : number = Number(prompt('Digite a idade do cliente'))
const cpfInput : number = Number(prompt('Digite o CPF do cliente'));
const emailInput : string = prompt('Digite o email do cliente');

const novoCliente: Cliente = {
    nome: nomeInput,
    idade: idadeInput,
    cpf: cpfInput,
    email: emailInput
};
cadastrarCliente(novoCliente);
console.log(verClientes());
