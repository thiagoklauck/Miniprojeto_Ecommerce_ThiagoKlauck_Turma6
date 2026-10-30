import type { ItemPedido, Pedido } from "./types";
import { buscarClientePorId } from "./clientes";
import { buscarProdutoPorId, baixarEstoque } from "./produtos";
import { verCarrinho, limparCarrinho } from "./carrinho";

const pedidos: Pedido[] = [];
let proximoPedidoId: number = 1;

function finalizarPedido(clienteId: number): Pedido | undefined {
    const cliente = buscarClientePorId(clienteId);

    if (!cliente) {
        console.log("Cliente não encontrado.");
        return;
    }

    const itensCarrinho = verCarrinho();

    if (itensCarrinho.length === 0) {
        console.log("Não é possível finalizar um pedido sem itens.");
        return;
    }

    const itensPedido: ItemPedido[] = [];
    let total: number = 0;

    
    for (const itemCarrinho of itensCarrinho) {
        const produto = buscarProdutoPorId(itemCarrinho.produtoId);

        if (!produto) {
            console.log("Produto do carrinho não encontrado.");
            return;
        }

        const subtotal: number = produto.preco * itemCarrinho.quantidade;

        itensPedido.push({
            produtoId: produto.id,
            nome: produto.nome,
            categoria: produto.categoria,
            quantidade: itemCarrinho.quantidade,
            precoUnitario: produto.preco,
            subtotal: subtotal
        });

        total = total + subtotal;
    }

    if (isNaN(total) || total <= 0 || total === Infinity) {
        console.log("Não foi possível calcular um total para o pedido.");
        return;
    }

    const pedido: Pedido = {
        id: proximoPedidoId,
        clienteId: clienteId,
        itens: itensPedido,
        total: total,
        data: Date.now()//metodo achado
    };

    if (!baixarEstoque(itensCarrinho)) {
        return;
    }

    pedidos.push(pedido);
    proximoPedidoId = proximoPedidoId + 1;
    limparCarrinho();

    return pedido;
}

function verPedidos(): Pedido[] {
    return pedidos;
}

function buscarPedidosPorCliente(clienteId: number): Pedido[] {
    return pedidos.filter(pedido => pedido.clienteId === clienteId);
}

export {
    finalizarPedido,
    verPedidos,
    buscarPedidosPorCliente
};
