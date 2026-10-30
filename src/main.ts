import promptSync = require('prompt-sync');
import { cadastrarCliente, verClientes, buscarClientePorId } from './clientes';
import {
    cadastrarProduto,
    verProdutos,
    buscarProdutoPorId,
    buscarProdutosPorNome,
    filtrarProdutosPorCategoria,
    atualizarProduto,
    removerProduto
} from './produtos';
import {
    adicionarProdutoAoCarrinho,
    removerProdutoDoCarrinho,
    alterarQuantidadeCarrinho,
    verCarrinho,
    calcularSubtotalItem,
    calcularTotalCarrinho
} from './carrinho';
import { finalizarPedido, verPedidos, buscarPedidosPorCliente } from './pedidos';
import type { Cliente, Produto, Pedido } from './types';

const prompt = promptSync({ sigint: true });

function pedirTexto(mensagem: string): string {
    let texto: string = prompt(mensagem).trim();

    while (texto === '') {
        console.log('O campo não pode estar vazio.');
        texto = prompt(mensagem).trim();
    }

    return texto;
}

function pedirNumero(mensagem: string): number {
    let entrada: string = prompt(mensagem).trim();
    let numero: number = Number(entrada);

    while (entrada === '' || isNaN(numero) || numero === Infinity || numero === -Infinity) {
        console.log('Digite um número válido.');
        entrada = prompt(mensagem).trim();
        numero = Number(entrada);
    }

    return numero;
}

function pedirPreco(): number {
    let preco: number = pedirNumero('Digite o preço: ');

    while (preco <= 0) {
        console.log('O preço deve ser maior que zero.');
        preco = pedirNumero('Digite o preço novamente: ');
    }

    return preco;
}

function pedirEstoque(): number {
    let estoque: number = pedirNumero('Digite o estoque: ');

    while (estoque < 0) {
        console.log('O estoque não pode ser negativo.');
        estoque = pedirNumero('Digite o estoque novamente: ');
    }

    return estoque;
}

function exibirClientes(clientesParaExibir: Cliente[]): void {
    if (clientesParaExibir.length === 0) {
        console.log('Nenhum cliente encontrado.');
        return;
    }

    for (const cliente of clientesParaExibir) {
        console.log(`ID: ${cliente.id} | Nome: ${cliente.nome} | Email: ${cliente.email}`);
    }
}

function exibirProdutos(produtosParaExibir: Produto[]): void {
    if (produtosParaExibir.length === 0) {
        console.log('Nenhum produto encontrado.');
        return;
    }

    for (const produto of produtosParaExibir) {
        console.log(`ID: ${produto.id} | ${produto.nome} | Categoria: ${produto.categoria} | Preço: R$ ${produto.preco.toFixed(2)} | Estoque: ${produto.estoque}`);
    }
}

function cadastrarClientePeloTerminal(): void {
    let id: number = pedirNumero('Digite o ID do cliente: ');

    while (id <= 0 || buscarClientePorId(id)) {
        console.log('ID inválido ou já cadastrado.');
        id = pedirNumero('Digite o ID novamente: ');
    }

    const nome: string = pedirTexto('Digite o nome do cliente: ');
    let email: string = pedirTexto('Digite o email do cliente: ');

    while (verClientes().find(cliente => cliente.email === email)) {
        console.log('Email já cadastrado.');
        email = pedirTexto('Digite outro email: ');
    }

    const cliente: Cliente = { id: id, nome: nome, email: email };
    cadastrarCliente(cliente);
    console.log('Cliente cadastrado.');
}

// Reúne os dados usados no cadastro e na atualização de produtos.
function pedirDadosProduto(id: number): Produto {
    const nome: string = pedirTexto('Digite o nome do produto: ');
    const categoria: string = pedirTexto('Digite a categoria: ');
    const preco: number = pedirPreco();
    const estoque: number = pedirEstoque();

    return { id: id, nome: nome, categoria: categoria, preco: preco, estoque: estoque };
}

function cadastrarProdutoPeloTerminal(): void {
    let id: number = pedirNumero('Digite o ID do produto: ');

    while (id <= 0 || buscarProdutoPorId(id)) {
        console.log('ID inválido ou já cadastrado.');
        id = pedirNumero('Digite o ID novamente: ');
    }

    cadastrarProduto(pedirDadosProduto(id));
    console.log('Produto cadastrado.');
}

function atualizarProdutoPeloTerminal(): void {
    const id: number = pedirNumero('Digite o ID do produto que deseja atualizar: ');

    if (!buscarProdutoPorId(id)) {
        console.log('Produto não encontrado.');
        return;
    }

    atualizarProduto(pedirDadosProduto(id));
    console.log('Produto atualizado.');
}

function removerProdutoPeloTerminal(): void {
    const id: number = pedirNumero('Digite o ID do produto que deseja remover: ');

    if (!buscarProdutoPorId(id)) {
        console.log('Produto não encontrado.');
        return;
    }

    removerProduto(id);
    console.log('Produto removido.');
}

function menuClientes(): void {
    let opcao: string = '';

    do {
        console.log('\nClientes');
        console.log('1 - Cadastrar');
        console.log('2 - Listar');
        console.log('3 - Buscar por ID');
        console.log('0 - Voltar');
        opcao = prompt('Escolha uma opção: ').trim();

        switch (opcao) {
            case '1':
                cadastrarClientePeloTerminal();
                break;
            case '2':
                exibirClientes(verClientes());
                break;
            case '3': {
                const id = pedirNumero('Digite o ID do cliente: ');
                const cliente = buscarClientePorId(id);

                if (cliente) {
                    exibirClientes([cliente]);
                } else {
                    console.log('Cliente não encontrado.');
                }
                break;
            }
            case '0':
                break;
            default:
                console.log('Opção inválida.');
        }
    } while (opcao !== '0');
}

function menuProdutos(): void {
    let opcao: string = '';

    do {
        console.log('\nProdutos');
        console.log('1 - Cadastrar');
        console.log('2 - Listar');
        console.log('3 - Buscar por ID');
        console.log('4 - Buscar por parte do nome');
        console.log('5 - Filtrar por categoria');
        console.log('6 - Atualizar');
        console.log('7 - Remover');
        console.log('0 - Voltar');
        opcao = prompt('Escolha uma opção: ').trim();

        switch (opcao) {
            case '1':
                cadastrarProdutoPeloTerminal();
                break;
            case '2':
                exibirProdutos(verProdutos());
                break;
            case '3': {
                const id = pedirNumero('Digite o ID do produto: ');
                const produto = buscarProdutoPorId(id);

                if (produto) {
                    exibirProdutos([produto]);
                } else {
                    console.log('Produto não encontrado.');
                }
                break;
            }
            case '4':
                exibirProdutos(buscarProdutosPorNome(pedirTexto('Digite parte do nome: ')));
                break;
            case '5':
                exibirProdutos(filtrarProdutosPorCategoria(pedirTexto('Digite a categoria: ')));
                break;
            case '6':
                atualizarProdutoPeloTerminal();
                break;
            case '7':
                removerProdutoPeloTerminal();
                break;
            case '0':
                break;
            default:
                console.log('Opção inválida.');
        }
    } while (opcao !== '0');
}

function exibirCarrinho(): void {
    if (verCarrinho().length === 0) {
        console.log('O carrinho está vazio.');
        return;
    }

    for (const item of verCarrinho()) {
        const produto = buscarProdutoPorId(item.produtoId);
        const subtotal = calcularSubtotalItem(item.produtoId);

        if (produto && subtotal !== undefined) {
            console.log(`${produto.nome} | Quantidade: ${item.quantidade} | Subtotal: R$ ${subtotal.toFixed(2)}`);
        }
    }
}

function menuCarrinho(): void {
    let opcao: string = '';

    do {
        console.log('\nCarrinho');
        console.log('1 - Adicionar produto');
        console.log('2 - Remover produto');
        console.log('3 - Alterar quantidade');
        console.log('4 - Ver itens e subtotais');
        console.log('5 - Ver total');
        console.log('0 - Voltar');
        opcao = prompt('Escolha uma opção: ').trim();

        switch (opcao) {
            case '1': {
                const id = pedirNumero('Digite o ID do produto: ');
                const quantidade = pedirNumero('Digite a quantidade: ');
                adicionarProdutoAoCarrinho(id, quantidade);
                break;
            }
            case '2':
                removerProdutoDoCarrinho(pedirNumero('Digite o ID do produto: '));
                break;
            case '3': {
                const id = pedirNumero('Digite o ID do produto: ');
                const quantidade = pedirNumero('Digite a nova quantidade: ');
                alterarQuantidadeCarrinho(id, quantidade);
                break;
            }
            case '4':
                exibirCarrinho();
                break;
            case '5': {
                const total = calcularTotalCarrinho();

                if (total !== undefined) {
                    console.log(`Total do carrinho: R$ ${total.toFixed(2)}`);
                }
                break;
            }
            case '0':
                break;
            default:
                console.log('Opção inválida.');
        }
    } while (opcao !== '0');
}

function exibirPedidos(pedidosParaExibir: Pedido[]): void {
    if (pedidosParaExibir.length === 0) {
        console.log('Nenhum pedido encontrado.');
        return;
    }

    for (const pedido of pedidosParaExibir) {
        console.log(`Pedido ${pedido.id} | Cliente: ${pedido.clienteId} | Total: R$ ${pedido.total.toFixed(2)}`);

        for (const item of pedido.itens) {
            console.log(`${item.nome} | Quantidade: ${item.quantidade} | Preço: R$ ${item.precoUnitario.toFixed(2)} | Subtotal: R$ ${item.subtotal.toFixed(2)}`);
        }
    }
}

function finalizarPedidoPeloTerminal(): void {
    const clienteId = pedirNumero('Digite o ID do cliente do pedido: ');

    for (const item of verCarrinho()) {
        const produto = buscarProdutoPorId(item.produtoId);

        if (produto) {
            console.log(`${produto.nome} | Estoque antes da compra: ${produto.estoque}`);
        }
    }

    const pedido = finalizarPedido(clienteId);

    if (pedido) {
        console.log(`Pedido ${pedido.id} registrado. Total: R$ ${pedido.total.toFixed(2)}`);

        for (const item of pedido.itens) {
            const produto = buscarProdutoPorId(item.produtoId);

            if (produto) {
                console.log(`${item.nome} | Estoque após a compra: ${produto.estoque}`);
            }
        }
    }
}

function menuPedidos(): void {
    let opcao: string = '';

    do {
        console.log('\nPedidos');
        console.log('1 - Finalizar compra');
        console.log('2 - Listar todos os pedidos');
        console.log('3 - Buscar pedidos de um cliente');
        console.log('0 - Voltar');
        opcao = prompt('Escolha uma opção: ').trim();

        switch (opcao) {
            case '1':
                finalizarPedidoPeloTerminal();
                break;
            case '2':
                exibirPedidos(verPedidos());
                break;
            case '3': {
                const clienteId = pedirNumero('Digite o ID do cliente: ');

                if (!buscarClientePorId(clienteId)) {
                    console.log('Cliente não encontrado.');
                    break;
                }

                exibirPedidos(buscarPedidosPorCliente(clienteId));
                break;
            }
            case '0':
                break;
            default:
                console.log('Opção inválida.');
        }
    } while (opcao !== '0');
}

// Executa somente a área escolhida pelo usuário.
function menuPrincipal(): void {
    let opcao: string = '';

    do {
        console.log('\nMiniprojeto de e-commerce');
        console.log('1 - Clientes');
        console.log('2 - Produtos');
        console.log('3 - Carrinho');
        console.log('4 - Pedidos');
        console.log('0 - Sair');
        opcao = prompt('Escolha uma opção: ').trim();

        switch (opcao) {
            case '1':
                menuClientes();
                break;
            case '2':
                menuProdutos();
                break;
            case '3':
                menuCarrinho();
                break;
            case '4':
                menuPedidos();
                break;
            case '0':
                console.log('Sessão encerrada.');
                break;
            default:
                console.log('Opção inválida.');
        }
    } while (opcao !== '0');
}

menuPrincipal();
