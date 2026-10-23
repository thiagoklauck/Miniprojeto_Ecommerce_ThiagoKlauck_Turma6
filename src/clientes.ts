import type { Cliente } from "./types";

const clientes: Cliente[] = [];

function cadastrarCliente(cliente: Cliente): void {
    clientes.push(cliente);
}
function verClientes(): Cliente[] {
return clientes;
}

export {
    cadastrarCliente,
    verClientes
}