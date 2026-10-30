import type { ItemCarrinho } from "./types";
import { buscarProdutoPorId } from "./produtos";


let carrinho: ItemCarrinho[] = [];


function validarQuantidade(quantidade: number): boolean {
    if (isNaN(quantidade) || quantidade <= 0 || quantidade === Infinity || quantidade % 1 !== 0) {
        console.log("A quantidade deve ser um número inteiro maior que zero.");
        return false;
    }

    return true;
}

function adicionarProdutoAoCarrinho(produtoId: number, quantidade: number): void {
    const produto = buscarProdutoPorId(produtoId);

    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    if (!validarQuantidade(quantidade)) {
        return;
    }

    const itemExistente = carrinho.find(item => item.produtoId === produtoId);
    let quantidadeTotal: number = quantidade;

    if (itemExistente) {
        quantidadeTotal = quantidadeTotal + itemExistente.quantidade;
    }

    if (quantidadeTotal > produto.estoque) {
        console.log("Quantidade superior ao estoque disponível.");
        return;
    }

   
    if (itemExistente) {
        alterarQuantidadeCarrinho(produtoId, quantidadeTotal);
        return;
    }

    carrinho.push({ produtoId: produtoId, quantidade: quantidade });
}

function removerProdutoDoCarrinho(produtoId: number): void {
    const itemExistente = carrinho.find(item => item.produtoId === produtoId);

    if (!itemExistente) {
        console.log("Produto não está no carrinho.");
        return;
    }

    carrinho = carrinho.filter(item => item.produtoId !== produtoId);
}


function alterarQuantidadeCarrinho(produtoId: number, quantidade: number): void {
    const itemExistente = carrinho.find(item => item.produtoId === produtoId);

    if (!itemExistente) {
        console.log("Produto não está no carrinho.");
        return;
    }

    const produto = buscarProdutoPorId(produtoId);

    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    if (!validarQuantidade(quantidade)) {
        return;
    }

    if (quantidade > produto.estoque) {
        console.log("Quantidade superior ao estoque disponível.");
        return;
    }

    carrinho = carrinho.map(item => {
        if (item.produtoId === produtoId) {
            return { produtoId: produtoId, quantidade: quantidade };
        }

        return item;
    });
}

function verCarrinho(): ItemCarrinho[] {
    return carrinho;
}


function calcularSubtotalItem(produtoId: number): number | undefined {
    const itemCarrinho = carrinho.find(item => item.produtoId === produtoId);

    if (!itemCarrinho) {
        console.log("Produto não está no carrinho.");
        return;
    }

    const produto = buscarProdutoPorId(produtoId);

    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    return produto.preco * itemCarrinho.quantidade;
}

function calcularTotalCarrinho(): number | undefined {
    let total: number = 0;

    for (const itemCarrinho of carrinho) {
        const subtotal = calcularSubtotalItem(itemCarrinho.produtoId);

        // Impede um total parcial quando algum produto não puder ser consultado.
        if (subtotal === undefined) {
            return;
        }

        total = total + subtotal;
    }

    return total;
}

// Prepara o carrinho para uma nova compra.
function limparCarrinho(): void {
    carrinho = [];
}

export {
    adicionarProdutoAoCarrinho,
    removerProdutoDoCarrinho,
    alterarQuantidadeCarrinho,
    verCarrinho,
    calcularSubtotalItem,
    calcularTotalCarrinho,
    limparCarrinho
};
