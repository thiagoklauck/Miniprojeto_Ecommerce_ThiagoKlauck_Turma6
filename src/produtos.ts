import type { Produto, ItemCarrinho } from "./types";

// Produtos iniciais para demonstrar as operações do sistema.
let produtos: Produto[] = [
    { id: 1, nome: "Teclado", categoria: "Informática", preco: 100, estoque: 5 },
    { id: 2, nome: "Mouse", categoria: "Informática", preco: 50, estoque: 10 },
    { id: 3, nome: "Camiseta", categoria: "Vestuário", preco: 40, estoque: 8 }
];

// Valida os dados do produto antes de cadastrá-lo ou atualizá-lo.
function validarDadosProduto(produto: Produto): boolean {
    let valorInvalido: boolean = false;

    if (isNaN(produto.id) || produto.id <= 0 || produto.id === Infinity) {
        console.log("O ID do produto deve ser um número maior que zero.");
        valorInvalido = true;
    }

    if (produto.nome.trim() === "") {
        console.log("O nome do produto não pode estar vazio.");
        valorInvalido = true;
    }

    if (isNaN(produto.preco) || produto.preco <= 0 || produto.preco === Infinity) {
        console.log("O preço do produto deve ser um número maior que zero.");
        valorInvalido = true;
    }

    if (isNaN(produto.estoque) || produto.estoque < 0 || produto.estoque === Infinity) {
        console.log("O estoque do produto deve ser um número maior ou igual a zero.");
        valorInvalido = true;
    }

    return !valorInvalido;
}

// Adiciona o produto somente se os dados forem válidos e o ID não estiver em uso.
function cadastrarProduto(produto: Produto): void {
    const dadosValidos = validarDadosProduto(produto);
    const produtoExistente = buscarProdutoPorId(produto.id);

    if (produtoExistente) {
        console.log("Já existe um produto com esse ID.");
    }

    if (!dadosValidos || produtoExistente) {
        return; // Exibe todos os erros encontrados antes de impedir o cadastro.
    }

    produtos.push(produto); // só cadastra o produto se todos os dados forem válidos.
}

function verProdutos(): Produto[] {
    return produtos;
}

function buscarProdutoPorId(id: number): Produto | undefined {
    return produtos.find(produtoCadastrado => produtoCadastrado.id === id);
}

function buscarProdutosPorNome(nome: string): Produto[] {
    const nomeBuscado = nome.trim().toLowerCase();

    if (nomeBuscado === "") {
        return [];
    }

    return produtos.filter(
        produtoCadastrado => produtoCadastrado.nome.toLowerCase().includes(nomeBuscado));
}

function filtrarProdutosPorCategoria(categoria: string): Produto[] {
    const categoriaBuscada = categoria.trim().toLowerCase();

    if (categoriaBuscada === "") {
        return [];
    }

    return produtos.filter(
        produtoCadastrado => produtoCadastrado.categoria.trim().toLowerCase() === categoriaBuscada);
}


function atualizarProduto(produto: Produto): void {
    const produtoExistente = buscarProdutoPorId(produto.id);

    if (!produtoExistente) {
        console.log("Produto não encontrado para atualização.");
        return;
    }

    if (!validarDadosProduto(produto)) {
        return; // mantém os dados anteriores quando a atualização é inválida.
    }

    produtos = produtos.map(produtoCadastrado => {
        if (produtoCadastrado.id === produto.id) {
            return produto;
        }

        return produtoCadastrado;
    });
}

// Remove somente o produto correspondente a um ID cadastrado.
function removerProduto(id: number): void {
    const produtoExistente = buscarProdutoPorId(id);

    if (!produtoExistente) {
        console.log("Produto não encontrado para remoção.");
        return;
    }

    produtos = produtos.filter(produtoCadastrado => produtoCadastrado.id !== id);
}

// Confere todos os itens antes de alterar qualquer estoque.
function baixarEstoque(itens: ItemCarrinho[]): boolean {
    for (const item of itens) {
        const produto = buscarProdutoPorId(item.produtoId);

        if (!produto) {
            console.log("Produto do carrinho não encontrado.");
            return false;
        }

        if (!validarDadosProduto(produto)) {
            return false;
        }

        if (isNaN(item.quantidade) || item.quantidade <= 0 || item.quantidade === Infinity || item.quantidade % 1 !== 0) {
            console.log("Quantidade inválida no carrinho.");
            return false;
        }

        if (item.quantidade > produto.estoque) {
            console.log("Estoque insuficiente para finalizar o pedido.");
            return false;
        }

        const itensDoProduto = itens.filter(itemCarrinho => itemCarrinho.produtoId === item.produtoId);

        if (itensDoProduto.length > 1) {
            console.log("Produto repetido no carrinho.");
            return false;
        }
    }

    // Aplica as baixas somente depois que todos os itens foram aprovados.
    produtos = produtos.map(produto => {
        const item = itens.find(itemCarrinho => itemCarrinho.produtoId === produto.id);

        if (item) {
            return {
                id: produto.id,
                nome: produto.nome,
                categoria: produto.categoria,
                preco: produto.preco,
                estoque: produto.estoque - item.quantidade
            };
        }

        return produto;
    });

    return true;
}

export {
    cadastrarProduto,
    verProdutos,
    buscarProdutoPorId,
    buscarProdutosPorNome,
    filtrarProdutosPorCategoria,
    atualizarProduto,
    removerProduto,
    baixarEstoque
};
